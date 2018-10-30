import Scalar from "./Scalar";
import Views from "./Views";

export default {
  ...Scalar.resolvers,
  Queries: {
    views: () => Views.Queries.resolvers
  },
  Mutations: {
    views: () => Views.Mutations.resolvers
  }
};
