import url from "url";
import { isGUID, isIP, isString, isEmpty } from "../../../../../utils";

const validIPOrDefault = (ip, defaultValue = "0.0.0.0") => {
  return (isIP(ip) && ip) || defaultValue;
};

const validUserAgentOrDefault = (user_agent, defaultValue = "Unknown") => {
  return isString(user_agent) && !isEmpty(user_agent)
    ? user_agent
    : defaultValue;
};

const validRefererOrDefault = (referer, defaultValue = null) => {
  try {
    return isString(referer) && !isEmpty(referer)
      ? url.parse(referer.trim()).href
      : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

const validNotEmptyOrDefault = (value, defaultValue = "na") =>
  isString(value) && !isEmpty(value) ? value : defaultValue;

export default {
  saveView: (
    {
      FeedID,
      IP = null,
      UserAgent = null,
      Referer = null,
      source = "feed"
    } = {},
    ctx
  ) => {
    return new Promise((resolve, reject) => {
      const now = +new Date();
      const today = new Date(+now);
      today.setUTCHours(0);
      today.setUTCMinutes(0);
      today.setUTCSeconds(0);
      today.setUTCMilliseconds(0);

      const thismonth = new Date(+today);
      thismonth.setUTCDate(0);

      if (!isGUID(FeedID)) {
        return reject(false);
      }

      const parsedSource =
        isString(source) &&
        !isEmpty(source) &&
        /^(feed|site)$/i.test(source.trim())
          ? source.trim().toLowerCase()
          : "feed";

      const parsedIP = validIPOrDefault(IP);
      const parsedUserAgent = validUserAgentOrDefault(UserAgent);
      const parsedReferer = validRefererOrDefault(Referer);

      let parsedRefererHost = null;
      try {
        parsedRefererHost = url.parse(parsedReferer).hostname;
      } catch (e) {}

      const lookup = ctx.maxmind.get(parsedIP);
      const country =
        (lookup &&
          ((lookup.represented_country &&
            lookup.represented_country.iso_code) ||
            (lookup.country && lookup.country.iso_code))) ||
        null;

      const city =
        (lookup &&
          lookup.city &&
          lookup.city.names &&
          JSON.stringify(lookup.city.names)) ||
        null;

      ctx.db.query(
        `
        INSERT INTO views (
              source,
              feed_id,
              ip,
              user_agent,
              city,
              country,
              referer,
              referer_host,
              daily_timecode,
              daily_timecode_with_ip,
              monthly_timecode,
              monthly_timecode_with_ip,
              created_at,
              updated_at
            ) VALUES (
              $1,$2,$3,
              $4,$5,$6,
              $7,$8,$9,
              $10,$11,$12,
              current_timestamp,
              current_timestamp);`,
        [
          parsedSource,
          FeedID,
          parsedIP,
          parsedUserAgent,
          city,
          country,
          parsedReferer,
          parsedRefererHost,
          +today,
          `${+today}_${parsedIP}`,
          +thismonth,
          `${+thismonth}_${parsedIP}`
        ],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(true);
        }
      );
    });
  }
};
