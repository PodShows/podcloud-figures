import saveView from "./resolvers";

describe("[Mutation] saveView", () => {
  test("return false with no arguments", () => {
    expect(saveView.saveView()).toBe(false);
  });
});
