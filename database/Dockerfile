FROM postgres:10.5-alpine as postgres

FROM postgres AS prod
COPY scripts/create.sql /docker-entrypoint-initdb.d

FROM prod AS dev
COPY scripts/testData.sql /docker-entrypoint-initdb.d
