import saveView from "./resolvers";
import postgres from "pg";
import testContext from "../../../../../tests/testContext.js";

describe("Views", () => {
  describe("saveView", () => {
    test("reject to false with no arguments", async () => {
      try {
        await saveView.saveView({}, await testContext());
      } catch (err) {
        expect(err).toBe(false);
      }
    });

    test("save a view", async () => {
      const context = await testContext();
      const viewData = {
        FeedID: "110e8400-e29b-11d4-a716-446655440000",
        IP: "127.0.0.1",
        UserAgent: "UserAgent test " + +new Date(),
        Referer: "http://referer.com/"
      };
      const response = await saveView.saveView(viewData, context);
      expect(response).toBe(true);

      const result = await new Promise((resolve, reject) => {
        context.db.query(
          `
        SELECT * FROM views WHERE user_agent = $1
      `,
          [viewData.UserAgent],
          (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve(results);
          }
        );
      });
      expect(result).toHaveProperty('rowCount', 1);
      expect(result.rows[0]).toHaveProperty('user_agent', viewData.UserAgent);
    });
  });
});
