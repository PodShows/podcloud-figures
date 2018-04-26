import gql from "graphql-tag";

import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

export const hello = {
  typeDefs,
  resolvers
};

export default hello;
