---
title: Docker Guide
description: A reference page to run your own Shepherd Pro instance.
---

You can use docker to set up the Shepherd Pro portal locally. From the main Shepherd repo, run the following command in the `app` directory:

```bash
docker-compose -f docker-compose.yml up
```

Make sure you have Docker Desktop running if you're starting on your own machine, then visit `http://localhost:8910/`. As a first step, you will need to create an account at [http://localhost:8910/signup](http://localhost:8910/signup).

## Architecture

The docker-compose file runs the following containers:

### Platform Application

The platform application allows you to create an account, view users and events, and setup journey instances. 

### Postgres Database

The application stores all its data within a Postgres database. Schema changes will be carried out automatically when
upgrading using Prisma migrations.
