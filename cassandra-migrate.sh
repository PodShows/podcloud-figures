#!/bin/sh

docker-compose run --rm -v "$PWD":/usr/src/myapp -w /usr/src/myapp cassandra_migrate cassandra-migrate $@