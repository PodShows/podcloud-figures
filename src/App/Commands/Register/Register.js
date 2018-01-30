import { Mongo } from "../../../Models"
import config from "config"

import { PodcastViewAppeal } from "../../../Appeals"
import { SignedPayload } from "../../../Utils"

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
        describe: "Signed JWT appeal"
      })
      .help()
  },
  handler: promiseHandler(
    argv =>
      new Promise((resolve, reject) => {
        SignedPayload.decodeAndVerify(argv.appeal).then(verifiedPayload => {
          Mongo.connect(config.get("mongodb")).then(() => {
            PodcastViewAppeal.process(verifiedPayload)
              .then(resolve, reject)
              .then(() => {
                Mongo.getConnection().close()
              })
          }, reject)
        }, reject)
      })
  )
}
