# Front-End

The front-end is a single page application (SPA) build using [Vue JS](https://vuejs.org/) in a highly flexible and resuable fashion. Most components were developed from scratch and are modular as well as fully responsive allowing for reuse in future projects. The front-end connects to the backend HTTP server with [Vue Axios](https://www.npmjs.com/package/vue-axios), getting content to populate the site with. The page transition and theme systems were also developed from scratch to be highly flexible and reusable. Greensocks's [GSAP](https://greensock.com/gsap) animation libraries were used extensively to provide a smooth and seamless user experience.

# Back-End

The back-end is a Level 3 RESTful API on the [Richardson Maturity Model](https://martinfowler.com/articles/richardsonMaturityModel.html) and is built using **NodeJS** and **Express**. It provides an interface between the content database and the front-end site. *GET*, *POST*, *PATCH* and *DELETE* request types are fully implemented to allow for complete user control over the content. Modifing endpoints are protected and use a flexible customly developed role-based system. See [here](https://github.com/alex-greff/personal-website/tree/master/server#http-requests) for documentation on the available endpoints.

## User Accounts

A flexible account system is used in order to protect modifing endpoints (i.e. most *POST*, *PATCH* and *DELETE* requests). User passwords are securely hashed using an implementation of [bcrypt](https://www.npmjs.com/package/bcryptjs). By default, new users are assigned to the `default` role but can be escalated by other system administrators higher roles. See [here](https://github.com/alex-greff/personal-website/tree/master/server#roles) for a complete list of all available roles.

## Database Integration

[Mongoose](https://mongoosejs.com/) is used to dynamically integrate the backend with the database.

## SoundCloud Scraping

The server also handles scraping SoundCloud for artist/track information for the `music` endpoint. [Puppeteer](https://github.com/GoogleChrome/puppeteer), [Cheerio](https://github.com/cheeriojs/cheerio) and [Axios](https://github.com/axios/axios) are utilized to scrape the SoundCloud global Client ID, user ID and track information which is then stored in database to be used by the client when populating the `music` route page. The scraping process can be easily triggered using *POST* and *PATCH* request to `music` endpoints.


# Database

MongoDB is used as the database for this site. Flexible schemas for projects, experiences and music items are utilized. User credentials are also securely stored in it. 

# Deployment

The deployment process is containerized using [Docker](https://www.docker.com/) and continuously integrated with [Travis CI](https://travis-ci.org/) which pulls the code from the GitHub repositorym, builds/tests it and then automates the deployment process onto a [Digital Ocean](https://www.digitalocean.com/) droplet.