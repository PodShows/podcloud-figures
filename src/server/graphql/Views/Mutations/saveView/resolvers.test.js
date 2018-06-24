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

    describe("save a view", () => {
      const viewData = {
        FeedID: "00000000-0000-0000-0000-000000000000",
        IP: "194.153.110.160", // paris.fr IP :D
        UserAgent: "UserAgent test " + +new Date(),
        Referer: "http://referer.com/"
      };

      let context;
      let response;
      let result;
      let insert;

      beforeAll(async () => {
        context = await testContext();
        response = await saveView.saveView(viewData, context);
        result = await new Promise((resolve, reject) => {
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
        insert = (result && result.rowCount && result.rows[0]) || null;
      });

      test("saves a view", async () => {
        expect(response).toBe(true);
        expect(result).toHaveProperty("rowCount", 1);
        expect(result.rows[0]).toHaveProperty("user_agent", viewData.UserAgent);
      });

      test("detect city and country", async () => {
        expect(insert).toHaveProperty("country", "FR");
        expect(insert.city).toHaveProperty("fr", "Paris");
      });

      test("scramble IP into database", async () => {
        expect(insert.ip).not.toBe(viewData.IP);
      });
    });
  });
});
