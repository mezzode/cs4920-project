# cs4920-project

[![Build Status](https://travis-ci.com/mezzode/cs4920-project.svg?token=6WdYqhE2VqFrFPokttzf&branch=master)](https://travis-ci.com/mezzode/cs4920-project)

## Before you start

Before you start, create a Docker volume named `cs4920-postgres-db` to persist the actual database:

```
docker volume create cs4920-postgres-db
```

To restart the docker volume run:

```
docker volume rm cs4920-postgres-db
```

You may need to remove any containers that have a reference to it:

```
docker system prune
```

## Development

```
yarn start
```

Launches server and database Docker containers. Server available at localhost:8080.

The `src/server` dir gets mounted into the `server` container and we use `ts-node-dev` to auto-reload the server on changes.

---

```
yarn start:build
```

(Re)builds then launches server and database Docker containers. Use this if you made any changes to the Dockerfiles so it builds a new container that reflects the changes.

## Debug docker

If you get an error with postgres files not being openable run

```
docker-compose rm postgres
```

Inspect postgres via psql

```
docker run -it --rm --link cs4920-project_postgres_1:postgres --net cs4920-project_default postgres psql -h postgres -U postgres
```

Inspect postgres via bash

```
docker run -it --rm --link cs4920-project_postgres_1:postgres --net cs4920-project_default postgres bash
```

Connect via port and psql

```
psql postgres://postgres@localhost:5433/appdb
```
