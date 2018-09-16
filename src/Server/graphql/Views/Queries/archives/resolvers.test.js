import archives from "./resolvers";
import { MakeAuthenticated } from "../../../../../Tests/TestContext";
import { archiveUrl } from "../../../../../Utils";

describe("Views", () => {
  describe("archives", () => {
    const FeedID = "00000000-0000-0000-0000-abb3fd72c1b8";
    const TimecodeAug = 1533081600;
    const FileAug = "6a20d919ef6203f8c0cc75d194674605a4b768f0.zip";
    const TimecodeJul = 1530403200;
    const FileJul = "e112f2eef2efd6f7c7d97970e3894ff033942dbe.zip";

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
              timecode: TimecodeAug,
              file: FileAug,
              created_at: new Date(2018, 8, 1)
            },
            {
              feed_id: FeedID,
              timecode: TimecodeJul,
              file: FileJul,
              created_at: new Date(2018, 7, 1)
            }
          ]
        })
      );

      it("with invalid authentication", async () => {
        const result = await archives({}, context);

        expect(result).toEqual(
          expect.objectContaining({ message: "Not Authenticated!" })
        );
      });

      it("with invalid FeedID", async () => {
        const ctx = MakeAuthenticated(context);

        const result = await archives({ FeedID: "invalid" }, ctx);
        expect(result).toEqual(
          expect.objectContaining({ message: "Invalid FeedID" })
        );
      });

      it("with no arguments", async () => {
        const ctx = MakeAuthenticated(context);

        const result = await archives({}, ctx);
        expect(result).toEqual(
          expect.objectContaining({ message: "Invalid FeedID" })
        );
      });
    });

    test("resolves archives", async () => {
      const archivesList = await archives(
        { FeedID },
        MakeAuthenticated(context)
      );

      expect(archivesList).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            date: new Date(2018, 8, 1),
            timecode: TimecodeAug,
            url: archiveUrl(FileAug)
          }),
          expect.objectContaining({
            date: new Date(2018, 7, 1),
            timecode: TimecodeJul,
            url: archiveUrl(FileJul)
          })
        ])
      );

      expect(context.db.query).toHaveBeenCalledWith(
        expect.any(String),
        expect.arrayContaining([FeedID])
      );
    });
  });
});
