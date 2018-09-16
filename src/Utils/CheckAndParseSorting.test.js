import CheckAndParseSorting from "./CheckAndParseSorting";

describe("CheckAndParseSorting", () => {
  it("should handle monthly sorting", () => {
    const parsed = CheckAndParseSorting("monthly");
    expect(parsed).toHaveProperty("sortingly", "monthly");
    expect(parsed).toHaveProperty("unitOfTime", "month");
  });

  it("should handle daily sorting", () => {
    const parsed = CheckAndParseSorting("daily");
    expect(parsed).toHaveProperty("sortingly", "daily");
    expect(parsed).toHaveProperty("unitOfTime", "day");
  });

  it("refuse an invalid sorting", () => {
    expect(() => CheckAndParseSorting("nul")).toThrow(
      "sorting should be daily or monthly"
    );
  });
});
