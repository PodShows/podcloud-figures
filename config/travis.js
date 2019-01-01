const test = require("./test");

module.exports = {
  ...test,
  postgres: {
    ...test.postgres,
    host: "localhost"
  }
};
