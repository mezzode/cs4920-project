# cs4920-project

## Development process
Launches server and database. Website available at localhost:8080. We use service workers so remember to clear cache if you think your changes aren't coming up.
```
yarn start:prod
```

## Debug docker
Inspect postgres via psql
```
docker run -it --rm --link cs4920-project_postgres_1:postgres --net cs4920-project_default postgres psql -h postgres -U postgres
```

Inspect postgres via bash
```
docker run -it --rm --link cs4920-project_postgres_1:postgres --net cs4920-project_default postgres bash
```