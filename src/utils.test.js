import * as utils from "./utils";

describe("Utils", () => {
  describe("isEmpty", () => {
    it("should return true with empty string", () => {
      expect(utils.isEmpty("")).toBe(true);
    });

    it("should return false with non empty string", () => {
      expect(utils.isEmpty("toto")).toBe(false);
    });

    it("should return true with empty array", () => {
      expect(utils.isEmpty([])).toBe(true);
    });

    it("should return false with non empty array", () => {
      expect(utils.isEmpty(["toto"])).toBe(false);
    });

    it("should return false with not a string or array", () => {
      expect(utils.isEmpty(null)).toBe(false);
      expect(utils.isEmpty({})).toBe(false);
    });
  });
});
