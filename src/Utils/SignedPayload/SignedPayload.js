import * as jwt from "jsonwebtoken"
import IssuersKeys from "./IssuersKeys"

import { InvalidIssuerPayloadError, InvalidPayloadError } from "./Errors"

const decodePayload = payload => {
  const decoded = jwt.decode(payload)

  if (!decoded) throw new InvalidPayloadError("Could not decode payload")
  if (!decoded.iss)
    throw new InvalidIssuerPayloadError("No issuer found in payload")

  return decoded
}

const getIssuerKey = payload => {
  const decoded = decodePayload(payload)

  return IssuersKeys.get(decoded.iss)
}

const verifyPayload = payload => {
  const issuer_key = getIssuerKey(payload)

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
        /* istanbul ignore next */
        reject(verified_payload)
      }
    } catch (e) {
      reject(e)
    }
  })
}

export default SignedPayload
