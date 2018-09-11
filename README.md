# cs4920-project

## Development process

Before you start, create a Docker volume named `cs4920-postgres-db` to persist the actual database:
```
docker volume create cs4920-postgres-db
```

Full launch
```
yarn start:prod:full
```

Launches server and database via docker instance faster. Website available at localhost:8080.
```
yarn start:prod:quick
```

When making changes, run the below command and refresh the website. We use service workers so remember to clear cache if you think your changes aren't coming up.
```
yarn build
```

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
