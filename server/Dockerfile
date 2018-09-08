FROM node:10.10.0-alpine

# Set a working directory
WORKDIR /usr/src/app

# Copy application files
COPY ./server ./server
RUN ls server

COPY ./web ./web
RUN ls web

COPY package.json .

# Install Node.js dependencies
RUN cd web && \
    yarn install --no-progress && \
    cd ..

RUN cd server && \
    node -v && \
    yarn install --no-progress && \
    cd ..

CMD ["yarn", "start"]