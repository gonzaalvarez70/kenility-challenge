## Kenility challenge repository

Used [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. Requirements:
A new company needs to address these requirements:
Create a Node API with Typescript.
Connect the Node API to MongoDB using Mongoose (desirable models in typescript).
We need to develop three endpoints behind a basic authentication (username and password).
Create a user with name, last name, address, and profile picture (this should be a file).
Retrieve users.
Update user.
Star point: Dockerize MongoDB and the Node API

## Installation

```bash
$ npm install
```

## Pre-requisites
You should run the DB locally first by running 
```
cd docker
docker-compose up -d
```

If you want to run a completely dockerized version of the app you can uncomment the first lines in the `docker-compose.yml` file and run `docker-compose up -d` this should run a local docker instance of both the DB and the API.

## Running the app locally

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

[MIT licensed](LICENSE).
