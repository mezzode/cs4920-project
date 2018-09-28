FROM node:10.10.0-alpine AS node

FROM node AS build

WORKDIR /usr/src/app

COPY . .
RUN ls

RUN yarn --no-progress
RUN yarn build

FROM node AS prod

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/build .

CMD ["node", "index.js"]
