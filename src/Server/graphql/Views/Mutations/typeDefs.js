export default [
  `
    type ViewMutations {
      saveView(
        FeedID: String!
        FeedName: String
        IP: String
        UserAgent: String
        Referer: String
        Source: String
      ): Boolean
    }
  `
];
