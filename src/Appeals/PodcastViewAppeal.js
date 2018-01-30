import path from "path"
import url from "url"

import Appeal from "./Appeal"
import { empty, notEmpty } from "../Utils/index"

import config from "config"
import { Mongo, View } from "../Models"

import maxmind from "maxmind"

const GEOLITE_PATH = path.join(__dirname, "./geoip/GeoLite2-City.mmdb")

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

    const feed_id = View.ObjectId(payload.fid)
    const ip = validIPOrDefault(payload.ip)
    const user_agent = validUserAgentOrDefault(payload.ua)
    const referer = validRefererOrDefault(payload.ref)

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
      feed_id,
      ip,
      user_agent,
      city,
      country,
      referer,
      referer_host,
      daily_timecode,
      daily_timecode_with_ip: daily_timecode + "_" + ip,
      monthly_timecode,
      monthly_timecode_with_ip: monthly_timecode + "_" + ip
    })

    registered_view.save().then(resolve, reject)
  })
}

export default PodcastViewAppeal
