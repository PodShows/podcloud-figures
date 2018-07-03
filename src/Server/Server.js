import config from "config";
import express from "express";
import AuthRequest from "./AuthRequest";
import bodyParser from "body-parser";
import { bodyParserGraphQL } from "body-parser-graphql";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { schema } from "./graphql";

const server = Symbol.for("server");

export default class Server {
  constructor(options = {}) {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParserGraphQL());

    if (options.graphiql !== false) {
      this.app.get("/graphiql", graphiqlExpress({ endpointURL: "/" })); // if you want GraphiQL enabled
    }

    this.app.use(
      "/",
      graphqlExpress(req => {
        const context = {
          ...req,
          auth: AuthRequest(req),
          ...options.ctx
        };

        return {
          schema,
          context
        };
      })
    );
  }

  start({ port = 5000 }) {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(port, err => {
        if (err) {
          reject(err);
        } else {
          resolve(this.server);
        }
      });
    });
  }

  stop() {
    return new Promise((resolve, reject) => {
      if (this.server) {
        this.server.close(err => {
          if (err) {
            reject(err);
          } else {
            this.server = null;
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }
}
