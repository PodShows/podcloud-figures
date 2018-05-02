USE podcloud_stats;

CREATE TABLE IF NOT EXISTS views (
    source varchar,
    feed_id uuid,
    ip inet,
    user_agent text,
    city map<text, text>,
    country varchar,
    referer varchar,
    referer_host varchar,
    daily_timecode int,
    daily_timecode_with_ip varchar,
    monthly_timecode int,
    monthly_timecode_with_ip varchar,
    created_at timestamp,
    updated_at timestamp,
    PRIMARY KEY (feed_id, source)
);
    