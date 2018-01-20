import { Mongo } from "../../Models"

import { PodcastViewAppeal } from "../../Appeals"

import promiseHandler from "yargs-promise-handler"

export const RegisterCommand = {
  command: "register <type> <appeal>",
  describe: "Register a view for a podcast or episode",
  builder: yargs => {
    yargs
      .positional("type", {
        describe: "Type of view to register",
        choices: ["podcast", "episode"]
      })
      .positional("appeal", {
        implies: "type",
        describe: "Signed JWT appeal"
      })
      .help()
  },
  handler: promiseHandler(
    argv =>
      new Promise((resolve, reject) => {
        PodcastViewAppeal.process(argv.appeal)
          .then(resolve, reject)
          .then(() => {
            Mongo.getConnection().close()
          })
      })
  )
}
