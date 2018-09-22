FROM postgres:10.5-alpine

COPY scripts/create.sql /docker-entrypoint-initdb.d
COPY scripts/testData.sql /docker-entrypoint-initdb.d
