import config from "config";
import { GraphQLServer } from "graphql-yoga";
import graphql from "./graphql";

const server = new GraphQLServer({
  ...graphql,
  context: req => ({
    ...req,
    db: null
  })
});

server.start({ port: 5000 }, () =>
  console.log("Server is running on http://localhost:4000")
);
