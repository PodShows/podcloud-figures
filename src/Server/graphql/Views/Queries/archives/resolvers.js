import withAuth from "graphql-auth";
import { isGUID, archiveUrl, withoutRoot } from "../../../../../Utils";

const archives = (root, args = { FeedID }, ctx, infos) => {
  const { FeedID } = args;

  if (!isGUID(FeedID)) {
    return Promise.resolve(new Error("Invalid FeedID"));
  }

  return ctx.db
    .query(
      `
          SELECT * FROM views_archives
          WHERE feed_id = $1
          ORDER BY timecode DESC
        `,
      [FeedID]
    )
    .then(results => {
      console.log(results);
      return results.rows.map(row => ({
        date: row.created_at,
        timecode: row.timecode,
        url: archiveUrl(row.filename)
      }));
    });
};

export default withoutRoot(withAuth(archives));
