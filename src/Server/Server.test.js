import Server from "./Server";
import config from "config";
import TestContext from "../Tests/TestContext";
import { tester } from "graphql-tester";

describe("Server", () => {
  const port = config.has("port") && config.get("port") || 5555;
  let testCtx;
  let db;
  let srv;
  let test;

  beforeAll(async () => {
    testCtx = await TestContext();
    delete testCtx.auth;
    db = testCtx.db;
    srv = new Server({ ctx: testCtx });
    await srv.start({ port });
    test = tester({
      url: `http://localhost:${port}`
    });
  });

  it("should answer to requests", async () => {
    const response = await test("{ __schema { types { name } } }");
    expect(response.success).toBe(true);
  });

  afterAll(async () => {
    await srv.stop();
    await db.close();
  });
});
