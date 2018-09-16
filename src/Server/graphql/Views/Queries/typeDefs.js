import ViewsArchive from "./ViewsArchive/typeDefs";
import ViewCountSorting from "./counts/ViewCountSorting";
import ViewSource from "./counts/ViewSource";
import ViewCount from "./counts/ViewCount/typeDefs";

export default [
  ViewsArchive,
  ViewCountSorting,
  ViewSource,
  ViewCount,
  `
    type ViewQueries {
      archives(FeedID: String!): [ViewsArchive]
      archive(FeedID: String!, Timecode: Int!): ViewsArchive
      counts(
        FeedID: String!, 
        Sorting: ViewCountSorting, 
        Source: ViewSource, 
        AfterTimecode: Int, 
        BeforeTimecode: Int
      ): [ViewCount]
    }
  `
];
