import moment from "moment";
import momentTz from "moment-timezone";

import CheckAndParseSorting from "./CheckAndParseSorting";
import PickFeedToComputeForSorting from "./PickFeedToComputeForSorting";
import ComputeViewsForSortingSourceAndFeed from "./ComputeViewsForSortingSourceAndFeed";

const ComputeViewCount = async (db, sorting) => {
  const { sortingly, unitOfTime } = CheckAndParseSorting(sorting);

  const {
    feed_id,
    timecode: last_timecode
  } = await PickFeedToComputeForSorting(db, sortingly);

  if (feed_id) {
    const start_date = moment
      .unix(last_timecode)
      .tz("utc")
      .endOf(unitOfTime)
      .add(1, "day")
      .startOf(unitOfTime)
      .unix();

    const end_date = moment
      .unix(start_date)
      .tz("utc")
      .endOf(unitOfTime)
      .unix();

    const sources = ["feed", "site"];

    for (let i = 0; i < sources.length; i++) {
      await ComputeViewsForSortingSourceAndFeed(
        db,
        sources[i],
        feed_id,
        start_date,
        end_date
      );
    }

    return true;
  }

  return false;
};

export default ComputeViewCount;
