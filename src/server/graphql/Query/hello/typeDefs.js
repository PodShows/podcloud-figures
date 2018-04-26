import gql from "graphql-tag";

export const hello = `
    hello: String
`;

export default gql`
type Query {
    ${hello}
}`;
