import gql from "graphql-tag";

export default [
  gql`
    type ViewMutations {
      saveView(
        FeedID: String
        IP: String
        UserAgent: String
        Referer: String
      ): String
    }
  `
];
