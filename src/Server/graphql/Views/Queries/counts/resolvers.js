import withAuth from "graphql-auth";
import {
  isGUID,
  isEmpty,
  withoutRoot,
  CheckAndParseSorting
} from "../../../../../Utils";

const counts = (
  root,
  args = { FeedID, Sorting, Source, AfterTimecode, BeforeTimecode },
  ctx,
  infos
) => {
  const { FeedID, Sorting, Source, AfterTimecode, BeforeTimecode } = args;

  if (!isGUID(FeedID)) {
    return Promise.resolve(new Error("Invalid FeedID"));
  }

  const params = [FeedID];

  let argc = 0;
  let query = `SELECT * FROM view_counts AS vc WHERE vc.feed_id = $${++argc}`;

  if (Sorting && !isEmpty(Sorting) && CheckAndParseSorting(Sorting)) {
    query += `AND sorting = $${++argc}`;
    params.push(Sorting);
  }

  if (!isEmpty(Source)) {
    query += ` AND source = $${++argc}`;
    params.push(Source);
  }

  if (BeforeTimecode > 0) {
    query += ` AND timecode < $${++argc}`;
    params.push(BeforeTimecode);
  }

  if (AfterTimecode > 0) {
    query += ` AND timecode > $${++argc}`;
    params.push(AfterTimecode);
  }

  return ctx.db.query(query, params).then(result => {
    return result.rows;
  });
};

export default withoutRoot(withAuth(counts));
