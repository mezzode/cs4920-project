FROM postgres:10.5-alpine

COPY scripts.sql /docker-entrypoint-initdb.d
RUN ls /docker-entrypoint-initdb.d