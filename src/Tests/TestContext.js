import postgres from "pg";
import maxmind from "maxmind";
import path from "path";
import config from "config";
import AuthRequest from "../Server/AuthRequest";

let context;

const TestContext = async () => {
  if (!context) {
    const db = new postgres.Client(config.get("postgres"));

    await db.connect();

    context = {
      db,
      maxmind: maxmind.openSync(
        path.resolve(__dirname + "/../../geoip/GeoLite2-City.mmdb")
      ),
      auth: AuthRequest({ get: () => {} })
    };
  }

  return context;
};

export const MakeAuthenticated = ctx => ({
  ...ctx,
  auth: { isAuthenticated: true, issuer: "debug", scope: ["*"] }
});

export default TestContext;
