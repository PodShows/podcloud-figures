import Views from "./Views";

export default {
  Queries: {
    views: () => Views.Queries.resolvers
  },
  Mutations: {
    views: () => Views.Mutations.resolvers
  }
};
