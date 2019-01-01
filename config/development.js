import process from "process";

const DISABLE_AUTH = true;

module.exports = {
  port: 80,
  workers: 1,
  postgres: {
    user: "postgres",
    host: "db",
    database: "podcloud_stats_dev"
  },
  noAuth: DISABLE_AUTH
};
