import saveView from "./saveView";
import postgres from "pg";
import TestContext, {
  MakeAuthenticated
} from "../../../../../Tests/TestContext.js";

describe("Views", () => {
  describe("saveView", () => {
    describe("return an error", () => {
      it("with invalid authentication", async () => {
        const context = await TestContext();

        const result = await saveView({}, {}, context);
        expect(result).toEqual(
          expect.objectContaining({ message: "Not Authenticated!" })
        );
      });

      it("with invalid FeedID", async () => {
        const context = MakeAuthenticated(await TestContext());

        const result = await saveView({}, { FeedID: "invalid" }, context);
        expect(result).toEqual(
          expect.objectContaining({ message: "Invalid FeedID" })
        );
      });

      it("with no arguments", async () => {
        const context = MakeAuthenticated(await TestContext());

        const result = await saveView({}, {}, context);
        expect(result).toEqual(
          expect.objectContaining({ message: "Invalid FeedID" })
        );
      });
    });

    describe("save a view", () => {
      const saveTestView = async (data = {}) => {
        const context = MakeAuthenticated(await TestContext());
        const viewData = {
          FeedID: ("00000000-0000-0000-0000-" + +new Date()).substring(0, 36),
          ...data
        };

        const response = await saveView({}, viewData, context);
        const result = await new Promise((resolve, reject) => {
          context.db.query(
            `
            SELECT * FROM views WHERE feed_id = $1
            `,
            [viewData.FeedID],
            (err, results) => {
              if (err) {
                return reject(err);
              }
              resolve(results);
            }
          );
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

      test("scramble IP into database", async () => {
        const test = await saveTestView({
          IP: "0.0.0.0"
        });

        expect(test.insert.ip).not.toBe(test.viewData.IP);
      });
    });
  });
});
