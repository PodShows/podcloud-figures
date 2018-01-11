/* eslint-env jest */
import * as Utils from "./utils"

describe("Utils", () => {
  describe("notEmpty", () => {
    test("should return true if string not empty", () => {
      expect(Utils.notEmpty("toto")).toBe(true)
    })

    test("should return false if string is empty", () => {
      expect(Utils.notEmpty("")).toBe(false)
      expect(Utils.notEmpty("   ")).toBe(false)
    })

    test("should return false if not a string", () => {
      expect(Utils.notEmpty({})).toBe(false)
      expect(Utils.notEmpty([])).toBe(false)
      expect(Utils.notEmpty([])).toBe(false)
    })
  })

  describe("empty", () => {
    test("should return false if string not empty", () => {
      expect(Utils.empty("toto")).toBe(false)
    })

    test("should return true if string is empty", () => {
      expect(Utils.empty("")).toBe(true)
      expect(Utils.empty("   ")).toBe(true)
    })

    test("should return true if not a string", () => {
      expect(Utils.empty({})).toBe(true)
      expect(Utils.empty([])).toBe(true)
      expect(Utils.empty([])).toBe(true)
    })
  })
})
