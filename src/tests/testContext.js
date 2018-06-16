import postgres from "pg"
import maxmind from "maxmind"
import path from "path"

let context;

const testContext = async () => {
  if(!context) {
    const db = new postgres.Client({
      user: "postgres",
      host: "localhost",
      database: "podcloud_stats_test"
    });

    await db.connect();

    context = {
      db,
      maxmind: maxmind.openSync(path.resolve(__dirname+"/../../geoip/GeoLite2-City.mmdb"))
    }
  }
  return context;
}

export default testContext;
