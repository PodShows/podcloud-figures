import { isGUID, isIP, isString, isEmpty } from "../../../../../utils";

export default {
  saveView: ({ FeedID, IP, UserAgent, Referer } = {}, ctx) => {
    return new Promise((resolve, reject) => {
      const now = +new Date();
      const today = new Date(+now);
      today.setUTCHours(0);
      today.setUTCMinutes(0);
      today.setUTCSeconds(0);
      today.setUTCMilliseconds(0);
      const thismonth = new Date(+today);
      thismonth.setUTCDate(0);

      if (
        !isGUID(FeedID) ||
        !isIP(IP) ||
        !isString(UserAgent) ||
        isEmpty(UserAgent) ||
        !isString(Referer) ||
        isEmpty(Referer)
      ) {
        return reject(false);
      }

			const lookup = ctx.maxmind.get(IP)
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
          "rss",
          FeedID,
          IP,
          UserAgent,
					city,
					country,
          Referer,
          "referer_host",
          +today,
          `${+today}_${IP}`,
          +thismonth,
          `${+thismonth}_${IP}`
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
