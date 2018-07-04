import TestGraphQL from "../../../../Tests/TestGraphQL.js";
import TestContext from "../../../../Tests/TestContext.js";

const FakeFeedID = () =>
  ("00000000-0000-0000-0000-" + +new Date()).substring(0, 36);

const GetViewWithFeedID = async FeedID => {
  const testCtx = await TestContext();
  const result = await new Promise((resolve, reject) => {
    testCtx.db.query(
      `
      SELECT * FROM views WHERE feed_id = $1
      `,
      [FeedID],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
  return (result && result.rowCount && result.rows[0]) || null;
};

TestGraphQL({
  Mutations: {
    saveView: {
      "error with no authentication": async ({ testQL }) => {
        const response = await testQL(
          `mutation { views { saveView(FeedID: "arg") } }`
        );
        expect(response.success).toBe(false);
        expect(Array.isArray(response.errors)).toBe(true);
        expect(response.errors.length).toBe(1);
        expect(response.errors[0]).toEqual(
          expect.objectContaining({ message: "Not Authenticated!" })
        );
      },
      "saves with minimal arguments": async ({ testQL }) => {
        const feed_id = FakeFeedID();
        const response = await testQL(
          `mutation { views { saveView(FeedID: "${feed_id}") } }`,
          {
            authorize: true
          }
        );
        expect(response.success).toBe(true);
        expect(response.data).toEqual({ views: { saveView: true } });

        const result = await GetViewWithFeedID(feed_id);

        expect(result).toEqual(expect.objectContaining({ feed_id }));
      }
    }
  }
});
