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

      ctx.cassandra.execute(
        `INSERT INTO  (
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
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          "rss",
          FeedID,
          IP,
          UserAgent,
          "city",
          "country",
          Referer,
          "referer_host",
          +today,
          `${+today}_${IP}`,
          +thismonth,
          `${+thismonth}_${IP}`,
          +now,
          +now
        ],
        function(err, results) {
          if (err) {
            console.error(err);
            return reject(err);
          }
          resolve(JSON.stringify(results));
        }
      );
    });
  }
};
