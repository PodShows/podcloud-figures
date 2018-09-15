const DeleteOldViews = async db => {
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
      WHERE           v.monthly_timecode <= extract('epoch' FROM date_trunc('month', now()) - interval '2' month)::bigint
    ) AS dataTable
    ORDER BY RANDOM()
    LIMIT 1;
    `
  );

  if (feedSearch.rowCount < 1) return;

  const { feed_id, monthly_timecode: timecode } = feedSearch.rows[0];

  console.debug(`Deleting old views for feed ${feed_id}.`);

  await db.query(
    `
      DELETE FROM PUBLIC.views AS v
      WHERE v.feed_id = $1 AND v.monthly_timecode = $2;
    `,
    [feed_id, timecode]
  );
};

export default DeleteOldViews;
