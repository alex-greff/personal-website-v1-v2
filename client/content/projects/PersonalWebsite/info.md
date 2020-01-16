---
title: "Personal Website"
startDate: "2018-12-01"
endDate: "2020-02-01"
tags: ["HTML", "CSS", "SCSS", "JavaScript", "Vue", "GridSome", "Docker", "Netlify"]
links: [
    { type: "github", link: "github.com/alex-greff/personal-website" },
    { type: "website", link: "alexgreff.com" }
]
thumbnailImage: "content/projects/PersonalWebsite/thumbnail.png"
galleryImages: []
---

# About

A personal website for myself developed from scratch with the current-most (v2) version being a statically-compiled site using [VueJS](https://vuejs.org/) and [GridSome](https://gridsome.org/). The project was done as a side project in order for myself to become more familiar with modern web development principals and design.

# Versions

## V2

The most current iteration of the project (and most likely the site that you are reading this on). Designed to be entirely static, it is compiled and built with [GridSome](https://gridsome.org/) while using [VueJS](https://vuejs.org/) as the front-end framework. A continuous-integration (CI) pipeline is setup with [Netlify](https://www.netlify.com/) along with the static file hosting being done there as well.

## V1

The first iteration of the site. Built with a dedicated RESTful backend, the project used [Node JS](https://nodejs.org/en/)/[Express](https://expressjs.com/) with the frontend using [VueJS](https://vuejs.org/) and [MongoDB](https://www.mongodb.com/) as the database. The entire application was deployed using [Docker](https://www.docker.com/) through a continuous-integration (CI) pipeline with [Travis CI](https://travis-ci.org/) to a [Digital Ocean](https://www.digitalocean.com/) droplot.

However, due to the project being (slightly) overkill and the hosting costs building up I decided to move onto V2 which suited this type of site much better.