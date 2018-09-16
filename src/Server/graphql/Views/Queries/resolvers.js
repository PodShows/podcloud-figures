import archives from "./archives/resolvers";
import archive from "./archive/resolvers";

export default {
  ...archives,
  ...archive
};
