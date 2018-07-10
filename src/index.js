import postgres from "pg";
import config from "config";
import Server from "./Server";
import Heartbeat from "./Heartbeat";
import maxmind from "./Maxmind";
import { CronJob } from "cron";

const App = () => {
  const app = {};

  app.run = (trying = 0) => {
    const db = new postgres.Client(
      (config.has("postgres") && config.get("postgres")) || undefined
    );

    db.connect()
      .then(
        () => {
          const server = new Server({ context: { db, maxmind } });
          const port = (config.has("port") && config.get("port")) || 5000;
          return server
            .start({ port })
            .then(() =>
              console.log(`Server is running on http://localhost:${port}`)
            );
        },
        err => {
          // 1 second minimum, 12 seconds maximum
          const retry_sec = Math.max(1, Math.min(12, trying + trying));
          console.error(`\n${err}\nRetrying in ${retry_sec} seconds...`);
          setTimeout(app.run, retry_sec * 1000, retry_sec);
        }
      )
      .then(() => {
        return db.end();
      });
  };

  app.cron = new CronJob({
    cronTime: "30 * * * * *",
    onTick: Heartbeat,
    start: true,
    timeZone: "UTC"
  });

  return app.run();
};

export default App;
