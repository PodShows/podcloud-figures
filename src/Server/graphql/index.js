import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import gql from "graphql-tag";

export const MakeSchema = () => makeExecutableSchema({typeDefs: [
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
], resolvers});

export default {
  typeDefs,
  resolvers
};
