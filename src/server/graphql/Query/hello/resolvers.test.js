import hello from "./resolvers";

describe("[Query] hello", () => {
  test("resolves hello", () => {
    expect(hello.hello()).toBe("Hello !");
  });
});
