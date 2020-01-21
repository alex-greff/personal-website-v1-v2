---
title: "Shabam"
startDate: "2019-06-01"
endDate: null
tags: ["Vue", "Node JS", "Express", "TypeScript", "GraphQL", "WebAssembly", "C++", "PostgreSQL", "Docker", "Kubernetes"]
links: [
    { type: "github", link: "github.com/alex-greff/shabam" }
]
thumbnailImage: "content/projects/Shabam/thumbnail.png"
galleryImages: []
---

# About

A replica of the popular music-recognition app, Shazam to be implemented entirely from scratch.


# The Plan

All **digital signal processing (DSP)** done on the front-end client will use [WebAssembly](https://webassembly.org/) in order to greatly increase performance. The backend uses [Node JS](https://nodejs.org/en/) and [GraphQL](https://graphql.org/) in order to provide a powerful API interface with the client. [TypeScript](https://www.typescriptlang.org/) is also used on the backend to allow for greater maintainability as the project continues to grow. Worker nodes are used by the backend API to offload processing and lookup of audio fingerprint data as well as the storage management. The project is fully containerized with [Docker](https://www.docker.com/) and will be deployed using [Kubernetes](https://kubernetes.io/) to allow for horizontal scalability.