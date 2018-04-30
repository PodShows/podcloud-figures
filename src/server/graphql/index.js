import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import gql from "graphql-tag";

export default {
  typeDefs: [
    typeDefs,
    gql`
      type Queries {
        views: ViewQueries
      }

      type Mutations {
        views: ViewMutations
      }

      schema {
        query: Queries
        mutation: Mutations
      }
    `
  ],
  resolvers
};
