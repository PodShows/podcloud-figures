import gql from "graphql-tag";
import { saveView } from "./saveView/typeDefs";

const typeDefs = gql`
type Mutation {
    ${saveView}
}
`;

export default typeDefs;
