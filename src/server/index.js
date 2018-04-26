import config from "config";
import { GraphQLServer } from "graphql-yoga";
import graphql from "./graphql";

export default class Server extends GraphQLServer {
  constructor(options) {
    super({
      ...options,
      ...graphql,
      context: req => ({
        ...req,
        db: null
      })
    });
  }
}
