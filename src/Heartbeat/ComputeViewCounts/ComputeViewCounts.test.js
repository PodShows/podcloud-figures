import PickFeedToComputeForSorting from "./PickFeedToComputeForSorting.js";
import ComputeViewsForSortingSourceAndFeed from "./ComputeViewsForSortingSourceAndFeed";

jest.mock("./PickFeedToComputeForSorting");
jest.mock("./ComputeViewsForSortingSourceAndFeed");

import ComputeViewCounts from "./ComputeViewCounts";

beforeEach(() => {
  PickFeedToComputeForSorting.mockClear();
  ComputeViewsForSortingSourceAndFeed.mockClear();
});

describe("ComputeViewCount", () => {
  it("compute daily views", async () => {
    const feed_id = 123;
    const timecode = 1456617600; // 2016/02/28 (leap year)

    // expected calculations
    const beginning_of_day = 1456704000;
    const end_of_day = 1456790399;

    const picked_feed = { feed_id, timecode };

    PickFeedToComputeForSorting.mockResolvedValueOnce(picked_feed);

    await ComputeViewCounts(null, "daily");

    expect(ComputeViewsForSortingSourceAndFeed).toHaveBeenNthCalledWith(
      1,
      null,
      "feed",
      feed_id,
      beginning_of_day,
      end_of_day
    );

    expect(ComputeViewsForSortingSourceAndFeed).toHaveBeenNthCalledWith(
      2,
      null,
      "site",
      feed_id,
      beginning_of_day,
      end_of_day
    );
  });

  it("compute monthly views", async () => {
    // Here we test something that should never happen :
    // a last_timecode not on the first day of the month
    // But we test it to be sure our system is robust on
    // stupid calculations (30 jan + 1 month)
    const feed_id = 123;
    const timecode = 1454112000; // 2016/01/30

    // expected calculations
    const beginning_of_month = 1454284800;
    const end_of_month = 1456790399;

    const picked_feed = { feed_id, timecode };

    PickFeedToComputeForSorting.mockResolvedValueOnce(picked_feed);

    await ComputeViewCounts(null, "monthly");

    expect(ComputeViewsForSortingSourceAndFeed).toHaveBeenNthCalledWith(
      1,
      null,
      "feed",
      feed_id,
      beginning_of_month,
      end_of_month
    );

    expect(ComputeViewsForSortingSourceAndFeed).toHaveBeenNthCalledWith(
      2,
      null,
      "site",
      feed_id,
      beginning_of_month,
      end_of_month
    );
  });
});
