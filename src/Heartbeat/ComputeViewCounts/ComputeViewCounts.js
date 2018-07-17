import ComputeDailyViewCounts from "./ComputeDailyViewCounts";
// import ComputeMonthlyViewCounts from "./ComputeMonthlyViewCounts";

const ComputeViewCount = async db => {
  await ComputeDailyViewCounts(db);
  // await ComputeMonthlyViewCounts(db);
};

export default ComputeViewCount;
