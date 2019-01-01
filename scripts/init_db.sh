#!/bin/sh
docker-compose run --rm db psql -h db -U postgres -c "CREATE DATABASE podcloud_stats_dev;"
docker-compose run --rm db psql -h db -U postgres -c "CREATE DATABASE podcloud_stats_test;"