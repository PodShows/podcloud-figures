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
  return db.createTable("views_archives", {
    id: { type: "serial", primaryKey: true },
    feed_id: { type: "uuid" },
    timecode: { type: "bigint" },
    filename: { type: "text" },
    created_at: { type: "timestamp" },
    updated_at: { type: "timestamp" }
  });
};

exports.down = function(db) {
  return db.dropTable("views_archives");
};

exports._meta = {
  version: 1
};
