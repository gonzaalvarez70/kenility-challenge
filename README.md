## Interview challenge repository

Used [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

#### Requirements:

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

You should start the DB and MinIO (Local S3) first

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
$ npm run dev

# production mode
$ npm run start:prod
```

## Try the API

Import the file in `postman-collection` to try out the 5 endpoints

```
POST http://localhost:3000/auth/signup
POST http://localhost:3000/auth/login
POST http://localhost:3000/users (requires authentication)
PUT http://localhost:3000/users (requires authentication)
GET http://localhost:3000/users (requires authentication)
```

## License

[MIT licensed](LICENSE).
