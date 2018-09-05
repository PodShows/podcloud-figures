import * as Utils from "./index";

describe("Utils", () => {
  describe("isEmpty", () => {
    it("should return true with empty string", () => {
      expect(Utils.isEmpty("")).toBe(true);
    });

    it("should return false with non empty string", () => {
      expect(Utils.isEmpty("toto")).toBe(false);
    });

    it("should return true with empty array", () => {
      expect(Utils.isEmpty([])).toBe(true);
    });

    it("should return false with non empty array", () => {
      expect(Utils.isEmpty(["toto"])).toBe(false);
    });

    it("should return false with not a string or array", () => {
      expect(Utils.isEmpty(null)).toBe(false);
      expect(Utils.isEmpty({})).toBe(false);
    });
  });
});
