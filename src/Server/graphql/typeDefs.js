import Views from "./Views";

export default () => [...Views.Queries.typeDefs, ...Views.Mutations.typeDefs];
