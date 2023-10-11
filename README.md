# Bid Admin API Demo

Bid Admin API is a back-end API that provides programmatic access to the database. It allows developers to create, read, update, and delete data. The API is RESTful and uses JSON as the data format.

The API is used by the bid portal demo to save and retrieve bid data.

## Prerequisite

1. Node Version Manager (nvm)
1. Pnpm

## Setup

1. Clone [bid-admin-api](git@github.com:rayandus/bid-admin-api.git) repo in your local

1. Go to project root directory and install

   ```bash
   cd bid-admin-api
   git checkout main
   nvm install
   pnpm install
   ```

1. Start the application

   ```bash
   pnpm start:dev
   ```

   > The api will run on port `3030` by default with preifx `api`. E.g. `http://localhost:3010/api`

   or

   ```bash
   PORT=<port> pnpm start:dev
   ```

1. Validate if api is working

  ```bash
  curl -X GET 'http://localhost:3010/api'
  ```

## More about this project

1. Built with NestJS and TypeScript

1. Database is powered by MongoDB hosted in Azure
