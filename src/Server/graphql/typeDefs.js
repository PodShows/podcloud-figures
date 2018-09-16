import Scalar from "./Scalar";
import Views from "./Views";

export default () => [
  ...Scalar.typeDefs,
  ...Views.Queries.typeDefs,
  ...Views.Mutations.typeDefs
];
