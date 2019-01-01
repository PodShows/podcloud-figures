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
  return db
    .createTable("display_names", {
      id: { type: "serial", primaryKey: true },
      feed_id: { type: "text", unique: true },
      display_name: { type: "text" },
      created_at: { type: "timestamp" },
      updated_at: { type: "timestamp" }
    })
    .then(() => {
      return db.addIndex("display_names", "feed_id", ["feed_id"], true);
    });
};

exports.down = function(db) {
  return db.dropTable("display_names");
};

exports._meta = {
  version: 1
};
