
## Table of Contents

- [Overview](#1-overview)
- [ER Diagram](#2-er-diagram)
- [Quick Start](#3-quick-start)
  - [Documentation](localhost:3000/api)
  - [Cloning the Repository](#31-cloning-the-repository)
  - [Installing Docker](#32-installing-and-configuring-docker)
  - [Environment Variables](#33-environment-variables)

---

## 1. Overview

An overview of the project and the technologies used.

- [NodeJS](https://nodejs.org/en/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://docs.docker.com/)

The base URL of the application:
http://yourapi.com/v1

---

## 2. ER Diagram

[Back to top](#table-of-contents)

ER Diagram of the API, defining the relationships between the database tables.

![ER Diagram](https://phx02pap002files.storage.live.com/y4mvNl9SXRCLc2F5Aq0P2VF9-wqXf0UySNAldMxqwx6XEfYCQy_dmJLhwDkP43hStwoNcllerSebyzoV5y_EvOAmcFIwKIkuLA4Go1MNd8JT29iGl-Ptys-Bzsc3F-lmK2I09p6QDdRaAx1XKPle5Gt9tVoXVlmz8j-U7R-XdXykW3D3f84-MCA7-AWoM2_XQl8ZugwUkaOf6M7lL7WDCmkvIj8S1ShsN9gqvYsrV_MvmY?encodeFailures=1&width=1422&height=632)

---

## 3. Quick Start

[Back to top](#table-of-contents)

### 3.1. Cloning the Repository

Clone the project to your machine:

<br>

```shell
git clone git@github.com:C4rt00n3/client-and-contat.git
```

<br>

### 3.2. instale e configure o Docker

Next, install [Docker](https://docs.docker.com/engine/install/) Once you have finished installing, let's configure it by following these [instructions](https://learn.microsoft.com/pt-br/virtualization/windowscontainers/manage-docker/configure-docker-daemon).

When everything is done, we only need to run the following command:

```
docker compose up --build
```

### 3.3. Environment Variables

<br>

```
cp .env.example .env
```

<br>

Next, create an .env file by copying the format of the .env.example file:

bash
Copy code
cp .env.example .env
Following the examples in the .env.example file:</br>
Configure your environment variables with your Postgres credentials and a new database of your choice.</br>
Configure how many days a loan will last and how many days the unlock deadline will be.</br>
Also, configure the script's execution interval in hours, the days, and the opening hours of the library.

## <br>
