import * as jwt from "jsonwebtoken"
import path from "path"
import fs from "fs"

import { InvalidIssuerPayloadError, InvalidPayloadError } from "./Errors"

const ISSUERS_KEYS_PATH = path.resolve(__dirname, "./issuers_keys")

const decodePayload = payload => {
  const decoded = jwt.decode(payload)

  if (!decoded) throw new InvalidPayloadError("Could not decode payload")
  if (!decoded.iss)
    throw new InvalidIssuerPayloadError("No issuer found in payload")

  return decoded
}

const checkAndGetIssuerKeyPath = payload => {
  const decoded = decodePayload(payload)

  const issuer_key_path = path.join(ISSUERS_KEYS_PATH, decoded.iss + ".pem")
  try {
    fs.accessSync(issuer_key_path, fs.constants.R_OK)
  } catch (err) {
    throw new InvalidIssuerPayloadError(
      "Could not find a readable issuer key at path: " + issuer_key_path
    )
  }
  return issuer_key_path
}

const verifyPayload = payload => {
  const issuer_key_path = checkAndGetIssuerKeyPath(payload)
  const issuer_key = fs.readFileSync(issuer_key_path)

  try {
    return jwt.verify(payload, issuer_key, {
      sub: "stats",
      algorithms: ["RS256"]
    })
  } catch (err) {
    if (
      err.name === "JsonWebTokenError" &&
      err.message.indexOf("subject invalid") >= 0
    ) {
      throw new InvalidPayloadError(
        err.message.replace("jwt subject", "Payload subject")
      )
    } else {
      throw new InvalidPayloadError(err.message)
    }
  }
}

export class SignedPayload {}
SignedPayload.decodeAndVerify = payload => {
  return new Promise((resolve, reject) => {
    try {
      const verified_payload = verifyPayload(payload)
      if (verified_payload && typeof verified_payload === "object") {
        resolve(verified_payload)
      } else {
        reject(verified_payload)
      }
    } catch (e) {
      reject(e)
    }
  })
}

export default SignedPayload
