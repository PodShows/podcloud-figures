"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable("views", {
    id: { type: "serial", primaryKey: true },
    source: { type: "text" },
    feed_id: { type: "uuid" },
    ip: { type: "text" },
    user_agent: { type: "text" },
    city: { type: "json" },
    country: { type: "text" },
    referer: { type: "text" },
    referer_host: { type: "text" },
    daily_timecode: { type: "bigint" },
    daily_timecode_with_ip: { type: "text" },
    monthly_timecode: { type: "bigint" },
    monthly_timecode_with_ip: { type: "text" },
    created_at: { type: "timestamp" },
    updated_at: { type: "timestamp" }
  });
};

exports.down = function(db) {
  return db.dropTable("views");
};

exports._meta = {
  version: 1
};
