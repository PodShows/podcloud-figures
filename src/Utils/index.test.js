import * as Utils from "./index";

describe("Utils", () => {
  describe("archiveUrl", () => {
    it("should return null when file is not a non empty string", () => {
      expect(Utils.archiveUrl()).toBe(null);
      expect(Utils.archiveUrl("")).toBe(null);
      expect(Utils.archiveUrl([])).toBe(null);
      expect(Utils.archiveUrl({})).toBe(null);
    });

    it("should return a correct url for file", () => {
      expect(Utils.archiveUrl("hello.zip")).toBe("/archives/he/ll/o/hello.zip");
      expect(Utils.archiveUrl("a.csv")).toBe("/archives/a/a.csv");
      expect(
        Utils.archiveUrl("5ed25af7b1ed23fb00122e13d7f74c4d8262acd8.csv")
      ).toBe(
        "/archives/5e/d2/5a/f7/b1/ed/23/fb/00/12/2e/13/d7/f7/4c/4d/82/62/ac/d8/5ed25af7b1ed23fb00122e13d7f74c4d8262acd8.csv"
      );
    });
  });

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
