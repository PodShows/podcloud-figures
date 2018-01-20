import * as jwt from "jsonwebtoken"

import fs from "fs"
import path from "path"

import url from "url"

import Appeal from "./Appeal"
import { InvalidIssuerAppealError, InvalidAppealError } from "./Errors"
import { empty, notEmpty } from "../Utils/index"

import config from "config"
import { Mongo, View } from "../Models"

import maxmind from "maxmind"

const ISSUERS_KEYS_PATH = path.resolve(__dirname, "../../config/issuers_keys")
const GEOLITE_PATH = path.join(__dirname, "/geoip/GeoLite2-City.mmdb")

const decodePayload = payload => {
  const decoded = jwt.decode(payload)

  if (!decoded) throw new InvalidAppealError("Could not decode appeal")
  if (!decoded.iss)
    throw new InvalidIssuerAppealError("No issuer found in appeal")

  return decoded
}

const checkAndGetIssuerKeyPath = payload => {
  const decoded = decodePayload(payload)

  const issuer_key_path = path.join(ISSUERS_KEYS_PATH, decoded.iss + ".pem")
  try {
    fs.accessSync(issuer_key_path, fs.constants.R_OK)
  } catch (err) {
    throw new InvalidIssuerAppealError(
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
      sub: "stats"
    })
  } catch (err) {
    if (
      err.name === "JsonWebTokenError" &&
      err.message.indexOf("subject invalid") >= 0
    ) {
      throw new InvalidAppealError(
        err.message.replace("jwt subject", "Appeal subject")
      )
    } else {
      throw new InvalidAppealError(err.message)
    }
  }
}

const validIPOrDefault = (ip, defaultValue = "0.0.0.0") => {
  return (maxmind.validate(ip) && ip) || defaultValue
}

const validUserAgentOrDefault = (user_agent, defaultValue = "Unknown") => {
  return notEmpty(user_agent) ? user_agent : defaultValue
}

const validRefererOrDefault = (referer, defaultValue = null) => {
  try {
    return notEmpty(referer) ? url.parse(referer.trim()).href : defaultValue
  } catch (e) {
    return defaultValue
  }
}

const validNotEmptyOrDefault = (value, defaultValue = "na") =>
  notEmpty(value) ? value : defaultValue

export class PodcastViewAppeal extends Appeal {}

const MAXMIND = Symbol.for("PodcastViewAppeal.maxmind")

PodcastViewAppeal.process = payload => {
  return new Promise((resolve, reject) => {
    if (typeof PodcastViewAppeal[MAXMIND] !== "object") {
      PodcastViewAppeal[MAXMIND] = maxmind.openSync(GEOLITE_PATH)
    }

    const verified_payload = verifyPayload(payload)

    const ip = validIPOrDefault(verified_payload.ip)
    const user_agent = validUserAgentOrDefault(verified_payload.ua)
    const referer = validRefererOrDefault(verified_payload.ref)

    const referer_host = (() => {
      try {
        return url.parse(referer).hostname
      } catch (e) {}

      return null
    })()

    const lookup = PodcastViewAppeal[MAXMIND].get(ip)
    const country =
      (lookup &&
        ((lookup.represented_country && lookup.represented_country.iso_code) ||
          (lookup.country && lookup.country.iso_code))) ||
      null

    const city =
      (lookup &&
        lookup.city &&
        lookup.city.names &&
        JSON.stringify(lookup.city.names)) ||
      null

    const now = new Date()

    const daily_timecode = +Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0,
      0,
      0,
      0
    )

    const monthly_timecode = +Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      0,
      0,
      0,
      0,
      0
    )

    const registered_view = new View({
      source: "feed",
      ip,
      user_agent,
      city,
      country,
      referer,
      referer_host,
      daily_timecode_with_ip: daily_timecode + "_" + ip,
      monthly_timecode,
      monthly_timecode_with_ip: monthly_timecode + "_" + ip
    })

    Mongo.connect(config.get("mongodb")).then(() => {
      registered_view.save().then(resolve, reject)
    }, reject)
  })
}

export default PodcastViewAppeal
