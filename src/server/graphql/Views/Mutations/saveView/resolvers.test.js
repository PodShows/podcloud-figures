import saveView from "./resolvers";
import cql from "node-cassandra-cql";

describe("Views", () => {
  describe("saveView", () => {
    test("return false with no arguments", () => {
      const cassandra = new cql.Client({
        hosts: ["localhost:9160"],
        keyspace: "podcloud_stats"
      });

      expect.assertions(1);

      expect( 
        saveView.saveView(
          {
            FeedID: "FeedID",
            IP: "127.0.0.1",
            UserAgent: "UserAgent",
            Referer: "http://referer.com/"
          },
          {
            cassandra
          } 
        )
      ).resolves.toBe("{}");
    });
  });
});
