# PERSONAL WEBSITE

## Development

* Start up docker containers with:

    `$ docker-compose -f docker-compose-dev.yml up --build`

* Development docker-compose for testing production containers

    `$ docker-compose -f docker-compose-dev-prod.yml up --build`

* Connections:

    * Client:

        `localhost:3050`

    * Server

        `localhost:3050/api`

**Note:** In order for the development environment to work, certain environment variables need to be setup properly. However, some of them are sensitive and cannot be shared here. Contact me (Alex) if you would like more information.

## Documentation

* [Client](/client/README.md)
    * [Theme System](/client/README.md#theme&#32;system)

* [Server](/server/README.md)
    * [Roles](/server/README.md#roles)
    * [HTTP Requests](/server/README.md#http-requests)
        * [Projects](/server/README.md#projects)
        * [Experiences](/server/README.md#experiences)
        * [Users](/server/README.md#users)
        * [Themes](/server/README.md#themes)
        * [Music](/server/README.md#music)
        * [Contact](/server/README.md#contact)