FROM postgres:10.5-alpine

COPY scripts.sql /docker-entrypoint-initdb.d
RUN chmod +x /docker-entrypoint-initdb.d/scripts.sql

RUN ls /docker-entrypoint-initdb.d

RUN chmod 777 var/lib/postgresql/data
