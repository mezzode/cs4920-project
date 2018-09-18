FROM node:10.10.0-alpine

WORKDIR /usr/src/app/server

RUN yarn install --no-progress

CMD ["yarn", "start"]

# this command just keeps the container alive so you can connect a terminal
# i.e. `docker run -it cs4920project_server_1 /bin/sh`
# CMD ["tail","-f", "/dev/null"]
