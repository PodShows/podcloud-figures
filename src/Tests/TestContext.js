import postgres from "pg";
import path from "path";
import config from "config";
import AuthRequest from "../Server/AuthRequest";
import maxmind from "../Maxmind.js";

let context;

const TestContext = async () => {
  if (!context) {
    const db = new postgres.Client(config.get("postgres"));

    await db.connect();

    context = {
      db,
      maxmind,
      auth: AuthRequest({ get: () => {} })
    };

    context.tearDown = async () => {
      try {
       await db.end();
      } catch(e) {
        if(
          !/ended by the other party$/.test(e.message)
        ) {
          throw e;
        }
      }
    };
  }

  return context;
};

export const MakeAuthenticated = ctx => ({
  ...ctx,
  auth: { isAuthenticated: true, issuer: "debug", scope: ["*"] }
});

export default TestContext;
