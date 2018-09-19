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
## Other possible issues

If you get the error relating to a daemon not running in the background after running the command:

```
docker volume create cs4920-postgres-db
```

then you have probably just installed docker just recently. You'll need to run `dockerd` in another terminal. Alternatively, you can restart you computer so the daemon will begin running. 


If you get the error: `Error starting userland proxy: listen tcp 0.0.0.0:XXXX: bind: address already in use` after running the command:

```
yarn start:build
```

Then you'll need to kill process using that port. Find the process id using the port `XXXX` and kill it with the commands:

```
lsof -nP +c 15 | grep LISTEN
kill -9 (process_id)
```

If you get the error "/bin/sh: **********: not found" after running the command:

```
yarn start:build
```

Then you are most likely missing some dependencies. Run the command `yarn` inside the root folder, server folder and web folder, to install the dependencies. 
