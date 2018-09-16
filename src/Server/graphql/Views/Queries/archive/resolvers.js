import withAuth from "graphql-auth";
import { isGUID, archiveUrl, withoutRoot } from "../../../../../Utils";

const archive = (root, args = { FeedID, Timecode }, ctx, infos) => {
  const { FeedID, Timecode } = args;

  if (!isGUID(FeedID)) {
    return Promise.resolve(new Error("Invalid FeedID"));
  }

  return ctx.db
    .query(
      `
        SELECT * FROM views_archives
        WHERE feed_id = $1 AND timecode = $2
        ORDER BY timecode DESC
      `,
      [FeedID, Timecode]
    )
    .then(results => {
      if (results.rowCount < 1) return null;

      return {
        date: results.rows[0].updated_at,
        timecode: results.rows[0].timecode,
        url: archiveUrl(results.rows[0].filename)
      };
    });
};

export default withoutRoot(withAuth(archive));
