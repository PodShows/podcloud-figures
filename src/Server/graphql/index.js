import { makeExecutableSchema } from "graphql-tools";
import { default as types } from "./typeDefs";
import resolvers from "./resolvers";

const Queries = `
  type Queries {
    views: ViewQueries
  }
`;

const Mutations = `
  type Mutations {
    views: ViewMutations
  }
`;

const SchemaDefinition = `
  schema {
    query: Queries
    mutation: Mutations
  }
`;

export const typeDefs = [SchemaDefinition, Queries, Mutations, types];

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default {
  schema,
  typeDefs,
  resolvers
};
