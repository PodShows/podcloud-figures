import config from "config";
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import AuthRequest from "./AuthRequest";
import { MakeSchema } from "./graphql";

const server = Symbol.for("server");

export default class Server {
  constructor(options = {}) {
    this.server = express();

    this.server.use('/graphql', bodyParser.json(), graphqlExpress(req => ({
      schema: MakeSchema(),
      context: {
        ...req,
        auth: authRequest(req),
        ...options.ctx
      }
    })));

    if(options.graphiql !== false) {
      this.server.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled
    }
  }

  start({ port = 5000 }) {
    return new Promise((resolve, reject) => {
      this.server.listen(port, (err) => { 
        if(err) { 
          reject(err); 
        } else { 
          resolve() 
        }
      })
    });
  }

  stop() {
    return new Promise((resolve, reject) => { 
      this.server.close((err) => { 
        if(err) { 
          reject(err); 
        } else { 
          resolve() 
        }
      });
    });
  }
}
