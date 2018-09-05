import saveView from "./saveView";
import postgres from "pg";
import { RandomFakeFeedID } from "../../../../../Utils";
import TestContext, {
  MakeAuthenticated
} from "../../../../../Tests/TestContext.js";

describe("Views", () => {
  describe("saveView", () => {
    let context;
    beforeAll(async () => {
      context = await TestContext();
    });

    afterAll(async () => {
      await context.tearDown();
    });

    describe("return an error", () => {
      it("with invalid authentication", async () => {
        const result = await saveView({}, context);
        expect(result).toEqual(
          expect.objectContaining({ message: "Not Authenticated!" })
        );
      });

      it("with invalid FeedID", async () => {
        const ctx = MakeAuthenticated(context);

        const result = await saveView({ FeedID: "invalid" }, ctx);
        expect(result).toEqual(
          expect.objectContaining({ message: "Invalid FeedID" })
        );
      });

      it("with no arguments", async () => {
        const ctx = MakeAuthenticated(context);

        const result = await saveView({}, ctx);
        expect(result).toEqual(
          expect.objectContaining({ message: "Invalid FeedID" })
        );
      });
    });

    describe("save a view", () => {
      const saveTestView = async (data = {}) => {
        const ctx = MakeAuthenticated(context);
        const viewData = {
          FeedID: RandomFakeFeedID(),
          ...data
        };

        const response = await saveView(viewData, ctx);
        const result = await new Promise((resolve, reject) => {
          context.db.connect((err, client, release) => {
            if (err) {
              return reject(err);
            }

            client.query(
              `SELECT * FROM views WHERE feed_id = $1`,
              [viewData.FeedID],
              (err, results) => {
                release();
                if (err) {
                  return reject(err);
                }
                resolve(results);
              }
            );
          });
        });

        const insert = (result && result.rowCount && result.rows[0]) || null;

        return {
          response,
          result,
          insert,
          viewData
        };
      };

      test("saves a view", async () => {
        const test = await saveTestView();
        expect(test.response).toBe(true);
        expect(test.result).toHaveProperty("rowCount", 1);
        expect(test.insert).toHaveProperty("feed_id", test.viewData.FeedID);
      });

      test("detect city and country", async () => {
        const test = await saveTestView({
          IP: "194.153.110.160" // paris.fr IP :D
        });

        expect(test.insert).toHaveProperty("country", "FR");
        expect(test.insert.city).toHaveProperty("fr", "Paris");
      });

      test("detect bots", async () => {
        const test = await saveTestView({
          UserAgent: "Googlebot/1.0"
        });

        expect(test.insert).toHaveProperty("is_bot", true);

        const testNotBot = await saveTestView({
          UserAgent: "Mozilla"
        });

        expect(testNotBot.insert).toHaveProperty("is_bot", false);
      });

      test("scramble IP into database", async () => {
        const test = await saveTestView({
          IP: "0.0.0.0"
        });

        expect(test.insert.ip).not.toBe(test.viewData.IP);
      });
    });
  });
});
