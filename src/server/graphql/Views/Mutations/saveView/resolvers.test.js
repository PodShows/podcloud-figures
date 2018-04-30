import saveView from "./resolvers";

describe("Views", () => {
  describe("saveView", () => {
    test("return false with no arguments", () => {
      expect(saveView.saveView()).toBe(false);
    });
  });
});
