'use strict';

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
  return db.createTable('view_counts' {
      'sorting': 'varchar'
      'feed_id': 'uuid',
      'timecode': 'bigint',
      'source': 'varchar',
      'unique': 'boolean',
      'bot': 'boolean',
      'count': 'bigint',
      'created_at': 'timestamp',
      'updated_at': 'timestamp'
  }, {
      'primary_key': '(sorting, feed_id, timecode), source, unique, bot'
  });
};

exports.down = function(db) {
  return db.dropTable('views');
};

exports._meta = {
  "version": 1
};
