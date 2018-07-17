import pickFeedToComputeForSorting from "../pickFeedToComputeForSorting";
import moment from "moment";
import momentTz from "moment-timezone";

const computeDailyViewsForSourceAndFeed = async (
  db,
  source,
  feed_id,
  start_date,
  end_date
) => {
  const client = await db.connect();
  try {
    const data = await db.query(
      `
          SELECT
            COUNT(distinct daily_timecode_with_ip) filter (where is_bot = false) as unique_humans,
            COUNT(*) filter (where is_bot = false) as humans,
            COUNT(distinct daily_timecode_with_ip) filter (where is_bot = true) as unique_bots,
            COUNT(*) filter (where is_bot = true) as bots
          FROM public.views
          WHERE source = $1 AND feed_id = $2 AND daily_timecode BETWEEN $3 AND $4
        `,
      [source, feed_id, start_date, end_date]
    );

    if (data && data.rowCount && data.rows[0]) {
      const counted = data.rows[0];
      await db.query(
        `
        INSERT INTO view_counts
          (feed_id, source, sorting, timecode, bots, unique_bots, humans, unique_humans)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8);
      `,
        [
          feed_id,
          source,
          "daily",
          start_date,
          counted.bots,
          counted.unique_bots,
          counted.humans,
          counted.unique_humans
        ]
      );
      return true;
    }
  } finally {
    client.release();
  }
};

const ComputeDailyViewCounts = async db => {
  const {
    feed_id,
    timecode: last_timecode
  } = await pickFeedToComputeForSorting(db, "daily");

  if (feed_id) {
    console.log("feed_id", feed_id);
    console.log("timecode", last_timecode);
    const start_date = moment
      .unix(last_timecode)
      .tz("utc")
      .add(1, "day")
      .startOf("day")
      .unix();
    const end_date = moment
      .unix(start_date)
      .tz("utc")
      .endOf("day")
      .unix();

    console.log("start_date", start_date);
    console.log("end_date", end_date);

    const sources = ["feed", "site"];
    for (let i = 0; i < sources.length; i++) {
      await computeDailyViewsForSourceAndFeed(
        db,
        sources[i],
        feed_id,
        start_date,
        end_date
      );
    }
  }

  return false;
};

export default ComputeDailyViewCounts;
