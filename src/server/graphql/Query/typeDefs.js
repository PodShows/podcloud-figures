import { hello } from "./hello/typeDefs";
import gql from "graphql-tag";

export const typeDefs = gql`
type Query {
    ${hello}
}
`;

export default typeDefs;
