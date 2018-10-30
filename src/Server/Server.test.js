import TestGraphQL from "../Tests/TestGraphQL";

TestGraphQL({
  "should answer to requests": async ({ testQL }) => {
    const response = await testQL("{ __schema { types { name } } }");
    expect(response.success).toBe(true);
    expect(response.data).toHaveProperty("__schema");
  }
});
