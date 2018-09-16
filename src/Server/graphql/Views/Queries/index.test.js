import TestGraphQL from "../../../../Tests/TestGraphQL.js";

TestGraphQL({
  Queries: {
    archives: async ({ testQL }) => {
      const response = await testQL(
        `{ views { archives(FeedID: "00000000-0000-0000-0000-37ad95f7bb8b") } }`
      );
      expect(response.success).toBe(true);
    },
    archive: async ({ testQL }) => {
      const response = await testQL(
        `{ 
          views { 
            archive(FeedID: "00000000-0000-0000-0000-37ad95f7bb8b", Timecode: 1530403200)
          }
        }`
      );
      expect(response.success).toBe(true);
    }
  }
});
