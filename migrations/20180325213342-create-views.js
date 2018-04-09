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
    return db.createTable('views' {
        'source': 'varchar',
        'feed_id': 'uuid',
        'ip': 'inet',
        'user_agent': 'text',
        'city': 'map',
        'country': 'varchar',
        'referer': 'varchar',
        'referer_host': 'varchar',
        'daily_timecode': 'int',
        'daily_timecode_with_ip': 'varchar',
        'monthly_timecode': 'int',
        'monthly_timecode_with_ip': 'varchar',
        'created_at': 'timestamp',
        'updated_at': 'timestamp'
    }, {
        'primary_key': '(feed_id, source)'
    });
};

exports.down = function(db) {
    return db.dropTable('views');
};

exports._meta = {
    "version": 1
};
