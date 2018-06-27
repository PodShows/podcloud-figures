import config from "config";
import { GraphQLServer } from "graphql-yoga";
import AuthRequest from "./AuthRequest";
import graphql from "./graphql";

export default class Server extends GraphQLServer {
  constructor(options) {
    super({
      ...options,
      ...graphql,
      context: req => ({
        ...req,
        auth: authRequest(req),
        ...options.ctx
      })
    });
  }
}
