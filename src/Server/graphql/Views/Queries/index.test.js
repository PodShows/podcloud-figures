import TestGraphQL from "../../../../Tests/TestGraphQL.js";

TestGraphQL({
  Queries: {
    hello: async ({ testQL }) => {
      const response = await testQL("{ views { hello } }");
      expect(response.success).toBe(true);
      expect(response.data).toEqual({ views: { hello: "Hello !" } });
    }
  }
});
