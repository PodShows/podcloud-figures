import postgres from "pg";
import config from "config";
import Server from "./Server";
import Heartbeat from "./Heartbeat";
import maxmind from "./Maxmind";
import { CronJob } from "cron";

const App = () => {
  const app = {};

  app.run = (trying = 0) => {
    const db = new postgres.Pool(
      (config.has("postgres") && config.get("postgres")) || undefined
    );

    app.workers = 0;
    app.max_workers = (config.has("workers") && config.get("workers")) || 5;
    app.context = { db, maxmind };
    app.cron = new CronJob({
      cronTime: "* * * * * *",
      onTick: async () => {
        if (app.workers < app.max_workers) {
          const worker_id = ++app.workers;
          await Heartbeat(app.context);
          app.workers--;
        }
      },
      start: true,
      timeZone: "UTC"
    });
    app.server = new Server({ context: app.context });
    const port = (config.has("port") && config.get("port")) || 5000;
    return app.server
      .start({ port })
      .then(() => console.log(`Server is running on http://localhost:${port}`));
  };

  return app.run();
};

export default App;
