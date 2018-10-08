# cs4920-project

[![Build Status](https://travis-ci.com/mezzode/cs4920-project.svg?token=6WdYqhE2VqFrFPokttzf&branch=master)](https://travis-ci.com/mezzode/cs4920-project)

In addition to the below, you should check out the [wiki](https://github.com/mezzode/cs4920-project/wiki).

## Setup

1. First, set up your text editor.
    1. Install a text editor. VS Code is recommended since it has out of the box support for Typescript. Other text editors may work, but this guide assumes you are using VS Code so they may need extra configuration.
    1. Install the Prettier and TSLint extensions for VS Code. This will ensure that your code is linted so errors can be fixed before they even get tested, as well as automatically formatting code consistently.
1. Install Node.js stable (not LTS), Yarn, and Docker
1. Clone the repo.
1. Run `yarn` in the root, `./web`, and `./server` directories to install their dependencies.

Now your environment is set up and you can start development.

## Scripts

A number of scripts are defined in the `package.json`s for each dir.

The ones you would be using most often are:

-   `yarn start` in root, which starts the server and db.
-   `yarn start` in `./web`, which starts the webapp.
-   `yarn storybook` in `./web`, which starts the Storybook.

Below are detailed explanations of what each script does.

### In Root

-   `yarn start`: Starts the `server` and `postgres` containers in dev mode. This will mount your `./server` directory into the container and automatically restart the server whenever you make changes.
    -   This simply runs `docker-compose up`, so you can also use this to, for example:
        -   Just start the `server` container: `yarn start server` (runs `docker-compose up server`)
        -   Force rebuild of the containers: `yarn start --build` (runs `docker-compose up --build`)
    -   Internally this uses `docker-compose.yml` and `docker-compose.override.yml`, which sets up the containers and runs `./server`'s `yarn start`.
-   `yarn start:prod`: Starts the `server` and `postgres` containers in prod mode.
    -   This does a full build of the server container, meaning the `./server` dir is copied into the server container and `yarn build` is run within the container, transpiling the source into JavaScript. The container will then run the transpiled source with `node build/index.js`.

### In `./web`

-   `yarn start`: Starts the webapp and live reloads it whenever you make changes.
-   `yarn build`: Builds the webapp by transpiling it into JavaScript such that the webapp can be served statically from the `./build` directory.
    -   You should not need to run this as it would be run when deploying the webapp.
-   `yarn test`: Runs the test suite using Jest.
-   `yarn eject`: Removes `react-scripts-ts` from the project and converts it to work standalone.g
    -   You DEFINITELY should not need to run this unless you know what you're doing.
-   `yarn storybook`: Starts the Storybook and live reloads it whenever you make changes.
-   `yarn build-storybook`: Builds the Storybook into static files.
    -   You should not need to run this unless you're serving the files for some reason.
-   `yarn lint`: Lints the whole `./web` TypeScript project.
    -   You can run this via VS Code's task runner and it will integrate with the Problems panel allowing you to jump directly to the problems.
        -   Open the command palette with `Ctrl+Shift+p`.
        -   Search for and select `Tasks: Run Task`.
        -   Select `Run lint (web)`.

### In `./server`

-   `yarn start`: Starts the server and restarts it whenever you make changes.
    -   You should not need to run this as it is run by `yarn start` in root within the server container.
    -   While this would work outside the container, it would not be able to connect to the `postgres` container i.e. the db.
-   `yarn build`: Transpiles the server source code into JavaScript in the `./server/build` directory.
    -   You should not need to run this unless you want to locally test the production build.
    -   It is run when the `server` container is built in production mode.
-   `yarn lint`: Lints the whole `./server` TypeScript project.
    -   You can run this via VS Code's task runner and it will integrate with the Problems panel allowing you to jump directly to the problems.
        -   Open the command palette with `Ctrl+Shift+p`.
        -   Search for and select `Tasks: Run Task`.
        -   Select `Run lint (server)`.
