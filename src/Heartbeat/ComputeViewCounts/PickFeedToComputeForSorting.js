import moment from "moment";
import momentTz from "moment-timezone";

import { CheckAndParseSorting } from "../../Utils";

// 1396310399 is 1 second before the day of podCloud first public release
const DEFAULT_TIMESTAMP = 1396310399;

const PickFeedToComputeForSorting = async (db, sorting) => {
  const { sortingly, unitOfTime } = CheckAndParseSorting(sorting);

  let query = `
      SELECT * 
        FROM (
                  (SELECT views.feed_id, 
                                COALESCE(MAX(view_counts.timecode), ${DEFAULT_TIMESTAMP}) as timecode 
                             FROM views 
                             LEFT JOIN view_counts 
                             ON views.feed_id = view_counts.feed_id AND view_counts.sorting = $1
                             GROUP BY views.feed_id 
                             ORDER BY timecode ASC)
                 UNION
                   (SELECT feed_id, timecode 
                               FROM view_counts 
                               WHERE sorting = $1
                               GROUP BY view_counts.feed_id, view_counts.timecode)
                ) AS tmp_table
      WHERE timecode < $2
      ORDER BY RANDOM()
      LIMIT 1;
  `;

  let params = [
    sortingly,
    moment()
      .tz("utc")
      .subtract(1, unitOfTime)
      .startOf(unitOfTime)
      .unix()
  ];

  const client = await db.connect();
  try {
    const results = await client.query(query, params);
    if (results.rowCount) {
      return results.rows[0];
    }
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }

  return {};
};

export default PickFeedToComputeForSorting;