import TestGraphQL from "../../../../Tests/TestGraphQL.js";

TestGraphQL({
  Mutations: {
    saveView: {
      "error with no authentication": async ({ testQL }) => {
        const response = await testQL(`mutation { views { saveView(FeedID: "arg") } }`);
        expect(response.success).toBe(false);
        expect(Array.isArray(response.errors)).toBe(true);
        expect(response.errors.length).toBe(1);
        expect(response.errors[0]).toEqual(
          expect.objectContaining({message: 'Not Authenticated!'})
        );
      },
    }
  }
});
