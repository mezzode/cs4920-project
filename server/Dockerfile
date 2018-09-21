FROM node:10.10.0-alpine

WORKDIR /usr/src/app

COPY . .
RUN ls

RUN yarn --no-progress
RUN yarn build

CMD ["node", "build/index.js"]
