import gql from "graphql-tag";

export const saveView = `
    saveView(FeedID: String, IP: String, UserAgent: String, Referer: String): Boolean
`;

export default gql`
type Mutation {
    ${saveView}
}`;
