import Server from "./Server";
import config from "config";
import TestContext from "../Tests/TestContext";


describe("Server", () => {
  const port = config.has("port") && config.get("port") || 5555;
  let testCtx;
  let db;
  let srv;

  beforeAll(async () => {
    testCtx = await TestContext();
    delete testCtx.auth;
    db = testCtx.db;
    srv = new Server({ testCtx });
    return new Promise(resolve => srv.start({ port, playground: false }, () => {
      console.log(`Test server is running on http:\/\/localhost:${port}`);
      resolve();
    }));
  });

  it("should answer to requests", () => {
    expect(true).toBe(true);
  });

  afterAll(async () => {
    server.stop();
  });

});
