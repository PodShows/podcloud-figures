import ComputeViewCounts from "./ComputeViewCounts";
import ArchiveViews from "./ArchiveViews";
import DeleteOldViews from "./DeleteOldViews";

const Heartbeat = async ({ db }) => {
  await ComputeViewCounts(db, "daily");
  await ComputeViewCounts(db, "monthly");
  await ArchiveViews(db);
  await DeleteOldViews(db);
};

export default Heartbeat;
