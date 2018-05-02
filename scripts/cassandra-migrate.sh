#!/bin/sh

echo "Starting dockers..."
docker-compose up -d

echo ""
echo "Launching migrations..."
for filename in migrations/*.cql; do
    printf $filename && \
    printf "." && \
    docker cp $filename cassandra0:/migration.cql && \
    printf "." && \
    docker-compose exec -T cassandra0 bash -c "cqlsh -f /migration.cql ; rm -f /migration.cql" && \
    printf ". Done.\n"
done