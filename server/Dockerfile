FROM node:10.10.0-alpine

WORKDIR /usr/src/app

COPY ./server ./server
RUN ls server
COPY ./web ./web
RUN ls web
COPY package.json .

RUN yarn --cwd web --no-progress
RUN yarn --cwd server --no-progress
RUN yarn --no-progress
RUN yarn build

CMD ["node", "server/build/index.js"]
