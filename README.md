# API Documentation

## Table of Contents

- [Overview](#1-overview)
- [ER Diagram](#2-er-diagram)
- [Quick Start](#3-quick-start)
  - [Documentation](localhost:3000/api)
  - [Cloning the Repository](#31-cloning-the-repository)
  - [Installing Docker](#32-installing-and-configuring-docker)
  - [Variáveis de Ambiente](#33-variáveis-de-ambiente)

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

```shell
git clone git@github.com:C4rt00n3/client-and-contat.git
```

### 3.2. instale e configure o Docker

Next, install [Docker](https://docs.docker.com/engine/install/) Once you have finished installing, let's configure it by following these [instructions](https://learn.microsoft.com/pt-br/virtualization/windowscontainers/manage-docker/configure-docker-daemon).

When everything is done, we only need to run the following command:

```
docker compose up --build
```

### 3.3. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Seguindo os exemplos presentes no .env.example:</br>
Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.</br>
Configure quantos dias durará um empréstimo e quantos dias será o prazo de desbloqueio.</br>
Configure também o intervalo em horas de execução do script, os dias e horários de funcionamento da biblioteca.

## <br>
