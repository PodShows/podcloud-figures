import ComputeViewCounts from "./ComputeViewCounts";

const Heartbeat = async ({ db }) => {
  await ComputeViewCounts(db, "daily");
  await ComputeViewCounts(db, "monthly");
};

export default Heartbeat;
