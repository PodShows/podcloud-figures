import ComputeViewCounts from "./ComputeViewCounts";

const Heartbeat = async () => {
  await ComputeViewCounts();
};

export default Heartbeat;
