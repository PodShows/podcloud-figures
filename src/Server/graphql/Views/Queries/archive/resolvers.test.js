import archive from "./resolvers";
import { MakeAuthenticated } from "../../../../../Tests/TestContext";
import { archiveUrl } from "../../../../../Utils";

describe("Views", () => {
  describe("archive", () => {
    const FeedID = "00000000-0000-0000-0000-abb3fd72c1b8";
    const Timecode = 1535673600;
    const filename = "6a20d919ef6203f8c0cc75d194674605a4b768f0.zip";

    const context = {
      auth: {},
      db: {
        query: jest.fn()
      }
    };

    describe("return an error", () => {
      context.db.query.mockReturnValue(
        Promise.resolve({
          rowCount: 1,
          rows: [
            {
              feed_id: FeedID,
              timecode: Timecode,
              updated_at: new Date(Timecode * 1000),
              filename
            }
          ]
        })
      );

      it("with invalid authentication", async () => {
        const result = await archive({}, context);

        expect(result).toEqual(
          expect.objectContaining({ message: "Not Authenticated!" })
        );
      });

      it("with invalid FeedID", async () => {
        const ctx = MakeAuthenticated(context);

        const result = await archive({ FeedID: "invalid" }, ctx);
        expect(result).toEqual(
          expect.objectContaining({ message: "Invalid FeedID" })
        );
      });

      it("with no arguments", async () => {
        const ctx = MakeAuthenticated(context);

        const result = await archive({}, ctx);
        expect(result).toEqual(
          expect.objectContaining({ message: "Invalid FeedID" })
        );
      });
    });

    test("resolves url", async () => {
      expect(
        await archive({ FeedID, Timecode }, MakeAuthenticated(context))
      ).toEqual(
        expect.objectContaining({
          date: new Date(Timecode * 1000),
          timecode: Timecode,
          url: archiveUrl(filename)
        })
      );

      expect(context.db.query).toHaveBeenCalledWith(
        expect.any(String),
        expect.arrayContaining([FeedID, Timecode])
      );
    });
  });
});
