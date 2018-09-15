import fs from "fs";
import path from "path";
import crypto from "crypto";

import JSZip from "jszip";
import ObjectsToCsv from "objects-to-csv";
import config from "config";
import mkdirp from "mkdirp";

const sha1 = str =>
  crypto
    .createHash("sha1")
    .update(str)
    .digest("hex");

const ArchiveViews = async db => {
  const feedSearch = await db.query(
    `
    SELECT *
    FROM
    (
      SELECT DISTINCT (v.feed_id, v.monthly_timecode),
                      v.feed_id,
                      v.monthly_timecode
      FROM            PUBLIC.views v
      INNER JOIN      PUBLIC.view_counts vc
      ON              v.feed_id = vc.feed_id
      AND             v.monthly_timecode = vc.timecode
      AND             vc.sorting = 'monthly'
      WHERE           v.monthly_timecode <= extract('epoch' FROM date_trunc('month', now()) - interval '1' month)::bigint
    ) AS dataTable
    ORDER BY RANDOM()
    LIMIT 1
    `
  );

  if (feedSearch.rowCount < 1) return;

  const { feed_id, monthly_timecode: timecode } = feedSearch.rows[0];

  console.debug(`Archiving feed ${feed_id}.`);

  const viewsSearch = await db.query(
    `
      SELECT *
      FROM   PUBLIC.views v
      WHERE  v.feed_id = $1
             AND v.monthly_timecode = $2 
    `,
    [feed_id, timecode]
  );

  const rows = viewsSearch.rows;
  const date = new Date(timecode * 1000);

  const data = await new ObjectsToCsv(rows).toString();
  const sha = sha1(data);
  const folder = path.resolve(
    config.csvDir,
    "./" + sha.match(/.{1,2}/g).join("/")
  );
  const outFile = path.resolve(folder, "./" + sha1(data) + ".zip");

  if (fs.existsSync(outFile)) return;

  await new Promise((resolve, reject) =>
    mkdirp(folder, err => (err && reject(err)) || resolve())
  );

  const zip = new JSZip();
  zip.file(feed_id + "-" + date.toISOString().slice(0, 10) + ".csv", data);
  await new Promise((resolve, reject) => {
    zip
      .generateNodeStream({
        compression: "DEFLATE",
        compressionOptions: {
          level: 9
        }
      })
      .pipe(fs.createWriteStream(outFile))
      .on("error", function(err) {
        console.error(err);
        reject(err);
      })
      .on("finish", function() {
        db.query(
          `
            INSERT INTO views_archives (
              feed_id,
              timecode,
              filename,
              created_at,
              updated_at
             ) values (
              $1, $2, $3,
              current_timestamp,
              current_timestamp
             );
          `,
          [feed_id, timecode, path.basename(outFile)]
        ).then(resolve, err => {
          fs.unlink(outFile);
          reject(err);
        });
      });
  });
};

export default ArchiveViews;
