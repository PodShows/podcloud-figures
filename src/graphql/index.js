import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import gql from "graphql-tag";

export default {
    typeDefs: [typeDefs, gql`
      schema {
        query: Query
      }
    `],
    resolvers
};
