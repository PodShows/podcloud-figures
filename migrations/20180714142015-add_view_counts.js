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
  return db.createTable("view_counts", {
    id: { type: "serial", primaryKey: true },
    source: { type: "text" },
    feed_id: { type: "uuid" },
    sorting: { type: "text" },
    timecode: { type: "bigint" },
    bots: { type: "bigint" },
    unique_bots: { type: "bigint" },
    humans: { type: "bigint" },
    unique_humans: { type: "bigint" },
    created_at: { type: "timestamp" },
    updated_at: { type: "timestamp" }
  });
};

exports.down = function(db) {
  return db.dropTable("view_counts");
};

exports._meta = {
  version: 1
};
