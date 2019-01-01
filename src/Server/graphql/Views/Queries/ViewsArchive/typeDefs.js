import ScalarDate from "../../../Scalar/Date/typeDefs";

export default () => [
  ScalarDate,
  `
  type ViewsArchive {
    date: Date,
    timecode: Int,
    url: String
  }
`
];
