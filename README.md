# Personal Website

The repository for my personal website.

## Development

### Requirements

The development environment uses Docker so make sure to have that installed.

### Developement Server

To start the development server run `npm run start:dev`

### Static Files Development Server

To test the production build run `npm run start:dev-prod` which will build the site statically and serve it through an Nginx server.

Connect to the website at [https://localhost:3050](https://localhost:3050).

### Intermediate GraphQL API Server

When using the development server Gridsome exposes an external intermediate GraphQL server used for organizing the data. Queries can be run to it from **[http://localhost:3050/___explore](http://localhost:3050/___explore)**

### Other Tools

For debugging purposes, a shell can be opened inside the client Docker container using `npm run shell:client`

Sometimes when adding a new npm package to the client site it won't be installed properly after restarting. To fix this run `npm run rm-services:dev-client` or `npm run rm-services:dev-prod-client`

The development server can also be restarted without restarting the docker-compose network by running `npm run restart:dev-client` or `npm run restart:dev-prod-client`

## Building

Run `npm build:client` while the development server is running to build the client. The files will be output into **/client/dist**
