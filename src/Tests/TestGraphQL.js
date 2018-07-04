import Server from "../Server";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "config";
import TestContext from "./TestContext";
import { tester } from "graphql-tester";

const debugToken = content => {
  return jwt.sign(
    { stamp: new Date() / 1000 },
    config.get("IssuersKeys.debug_key"),
    {
      algorithm: "RS256",
      subject: "stats",
      issuer: "debug"
    }
  );
};

const TestGraphQL = (tests = {}) => {
  describe("GraphQL Server", () => {
    const port =
      (config.has("port") && config.get("port")) ||
      Math.floor(Math.random() * (65535 - 49152 + 1) + 49152);
    let testCtx;
    let db;
    let srv;
    let testQL;

    beforeAll(async () => {
      testCtx = await TestContext();
      delete testCtx.auth;
      db = testCtx.db;
      srv = new Server({ ctx: testCtx });
      await srv.start({ port });
      testQL = (query, { authorize = false } = {}) => {
        const graphtester = tester({
          url: `http://localhost:${port}`,
          authorization: authorize ? "Bearer " + debugToken(query) : undefined
        });
        return graphtester(query);
      };
    });

    const runSubtests = (tests => {
      Object.keys(tests).forEach(key => {
        const subtest = tests[key];
        if (typeof subtest === "function") {
          it(key, async () => {
            await subtest({ ...this, testQL });
          });
        } else if (typeof subtest === "object") {
          describe(key, runSubtests.bind(this, subtest));
        }
      }, this);
    }).bind(this);

    runSubtests(tests);

    afterAll(async () => {
      await srv.stop();
      await db.close();
    });
  });
};

export default TestGraphQL;
