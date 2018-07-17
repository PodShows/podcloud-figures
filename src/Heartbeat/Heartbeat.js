import ComputeViewCounts from "./ComputeViewCounts";

const Heartbeat = async ({ db }) => {
  await ComputeViewCounts(db);
};

export default Heartbeat;
