import CheckAndParseSorting from "./CheckAndParseSorting";

const ComputeViewsForSortingSourceAndFeed = async (
  db,
  sorting,
  source,
  feed_id,
  start_date,
  end_date
) => {
  const { sortingly, unitOfTime } = CheckAndParseSorting(sorting);
  const client = await db.connect();

  try {
    const data = await db.query(
      `
      SELECT
        COUNT(distinct ${sortingly}_timecode_with_ip) filter (where is_bot = false) as unique_humans,
        COUNT(*) filter (where is_bot = false) as humans,
        COUNT(distinct ${sortingly}_timecode_with_ip) filter (where is_bot = true) as unique_bots,
        COUNT(*) filter (where is_bot = true) as bots
      FROM public.views
      WHERE source = $1 AND feed_id = $2 AND ${sortingly}_timecode BETWEEN $3 AND $4
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
          sortingly,
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

export default ComputeViewsForSortingSourceAndFeed;
