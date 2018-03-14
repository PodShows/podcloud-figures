import path from "path"
import fs from "fs"

import { InvalidIssuerPayloadError, InvalidPayloadError } from "../Errors"

const ISSUERS_KEYS_PATH = path.resolve(__dirname, "./")

export default {
  get: name => {
    const issuer_key_path = path.join(ISSUERS_KEYS_PATH, name + ".pem")

    try {
      fs.accessSync(issuer_key_path, fs.constants.R_OK)
    } catch (err) {
      throw new InvalidIssuerPayloadError(
        "Could not find a readable issuer key at path: " + issuer_key_path
      )
    }

    /* istanbul ignore next */
    return fs.readFileSync(issuer_key_path)
  }
}
