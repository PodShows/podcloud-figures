import ScalarDate from "../../../../Scalar/Date/typeDefs";

export default () => [
  ScalarDate,
  `
  type ViewCount {
    feed_id: String!
    source: String!
    sorting: String!
    timecode: Int!
    bots: Int!
    unique_bots: Int!
    humans: Int!
    unique_humans: Int!
    updated_at: Date!
    created_at: Date!
  }
`
];
