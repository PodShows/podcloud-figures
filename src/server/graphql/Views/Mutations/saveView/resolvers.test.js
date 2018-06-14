import saveView from "./resolvers";
import postgres from "pg";

describe("Views", () => {
  describe("saveView", () => {
    test("reject to false with no arguments", async () => {
      const db = new postgres.Client({
        user: "postgres",
        host: "localhost",
        database: "podcloud_stats_test"
      });

      await db.connect();
      try {
        await saveView.saveView(
          {},
          {
            db
          }
        );
      } catch (err) {
        expect(err).toBe(false);
      }
    });

    test("resolve to true with correct arguments", async () => {
      const db = new postgres.Client({
        user: "postgres",
        host: "localhost",
        database: "podcloud_stats_test"
      });

      await db.connect();
      const response = await saveView.saveView(
        {
          FeedID: "110e8400-e29b-11d4-a716-446655440000",
          IP: "127.0.0.1",
          UserAgent: "UserAgent",
          Referer: "http://referer.com/"
        },
        {
          db
        }
      );
      expect(response).toBe(true);
    });
  });
});
