export default [
  `
    type ViewQueries {
      archives(FeedID: String!): [String]
      archive(FeedID: String!, Timecode: Int!): String
    }
  `
];
