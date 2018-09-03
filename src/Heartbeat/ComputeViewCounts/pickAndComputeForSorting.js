import pickFeedToComputeForSorting from "./pickFeedToComputeForSorting";
import computeViewsForSortingSourceAndFeed from "./computeViewsForSortingSourceAndFeed";
import moment from "moment";
import momentTz from "moment-timezone";

const pickAndComputeForSorting = async (db, sorting) => {
  if (/^daily|monthly$/i.test(sorting)) {
    const sortingly = sorting.toLowerCase();
    const unitOfTime = sorting === "daily" ? "day" : "month";
  } else {
    throw new TypeError("sorting should be daily or monthly");
  }

  const {
    feed_id,
    timecode: last_timecode
  } = await pickFeedToComputeForSorting(db, sortingly);

  if (feed_id) {
    const start_date = moment
      .unix(last_timecode)
      .tz("utc")
      .add(1, unitOfTime)
      .startOf(unitOfTime)
      .unix();
    const end_date = moment
      .unix(start_date)
      .tz("utc")
      .endOf(unitOfTime)
      .unix();

    const sources = ["feed", "site"];
    for (let i = 0; i < sources.length; i++) {
      await computeViewsForSortingSourceAndFeed(
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

export default pickFeedToComputeForSorting;
