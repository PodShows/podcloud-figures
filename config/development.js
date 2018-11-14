import process from "process";

module.exports = {
  port: 80,
  workers: 1,
  postgres: {
    user: "postgres",
    host: "db",
    database: "podcloud_stats_dev"
  }
};
