import moment from "moment";
import momentTz from "moment-timezone";
import getMonthlyFeedsComputedAt from "./getMonthlyFeedsComputedAt";

const ComputeMonthlyViewCounts = async db => {
  const { feed_id, timecode } = await pickFeedToComputeForSorting(db, "daily");

  if (feed_id) {
  }

  return false;
};

export default ComputeMonthlyViewCounts;
