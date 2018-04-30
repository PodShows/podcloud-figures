import hello from "./resolvers";

describe("Views", () => {
  describe("hello", () => {
    test("resolves hello", () => {
      expect(hello.hello()).toBe("Hello !");
    });
  });
});
