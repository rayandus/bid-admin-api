# Bid Admin API Demo

Bid Admin API is a back-end API that provides programmatic access to the database. It allows developers to create, read, update, and delete data. The API is RESTful and uses JSON as the data format.

The API is used by the bid portal demo to save and retrieve bid data.

## Prerequisite

1. Node Version Manager (nvm)
1. Pnpm
1. (Optional) Docker

## Setup

1. Clone [bid-admin-api](git@github.com:rayandus/bid-admin-api.git) repo in your local

1. Go to project root directory and install

   ```bash
   cd bid-admin-api
   git checkout main
   nvm install
   pnpm install
   ```

1. Start the application without Docker

   ```bash
   pnpm start:dev
   ```

   > The api will run on port `3000` by default with preifx `api`. E.g. `http://localhost:3010/api`

   or

   ```bash
   PORT=3000 pnpm start:dev
   ```

   > Just replace `PORT=3000` to your choice of port

1. Or, start the application with Docker

   ```bash
   docker build -t app .
   ```

   > You can replace `app` with any name

   ```bash
   docker run -p 3000:3000 app
   ```

   > To ensure that the app is accessible from the docker container, map the ports. Left port can be any port. Right port is the default port of the app as it runs in the docker container.
   >
   > You can do this `3010:3000`

1. Validate if api is working

  ```bash
  curl -X GET 'http://localhost:3000/api'
  ```

## Database

This api will automatically connect to a MongoDB hosted in Azure. The connection string is not included for security purposes.

To change the database configuration:

1. Create a .env

1. Add this variable with the new connection string

  ```bash
  MONGO_DB_CONNSTR=mongodb://dbname:password@host.com:10255/...
  ```

## More about this project

1. Built with NestJS and TypeScript

1. Database is powered by MongoDB hosted in Azure
