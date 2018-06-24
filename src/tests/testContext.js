import postgres from "pg";
import maxmind from "maxmind";
import path from "path";
import config from "config";

let context;

const testContext = async () => {
  if (!context) {
    const db = new postgres.Client(config.get("postgres"));

    await db.connect();

    context = {
      db,
      maxmind: maxmind.openSync(
        path.resolve(__dirname + "/../../geoip/GeoLite2-City.mmdb")
      )
    };
  }
  return context;
};

export default testContext;
