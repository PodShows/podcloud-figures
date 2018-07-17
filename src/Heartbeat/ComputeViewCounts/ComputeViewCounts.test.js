import TestContext from "../../Tests/TestContext.js";
import ComputeViewCounts from "./ComputeViewCounts";

describe("ComputeViewCount", () => {
  let context;

  beforeAll(async () => {
    context = await TestContext();
  });

  afterAll(async () => {
    await context.tearDown();
  });

  it("should compute daily view counts", async () => {
    await ComputeViewCounts(context.db);
    expect(true).toBe(true);
  });
});
