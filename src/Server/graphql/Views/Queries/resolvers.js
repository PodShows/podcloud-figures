import archives from "./archives/resolvers";
import archive from "./archive/resolvers";
import counts from "./counts/resolvers";
import ViewsArchive from "./ViewsArchive/resolvers";

const resolvers = {
  archives,
  archive,
  counts,
  ViewsArchive
};

export default resolvers;
