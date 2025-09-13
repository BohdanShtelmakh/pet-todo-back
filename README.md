# Pet TODO Backend

A simple TODO API built with [NestJS](https://nestjs.com/), TypeScript, and PostgreSQL.

---

## Features

- User registration & JWT authentication
- CRUD for TODO items
- TODO reordering & filtering
- PostgreSQL with TypeORM
- OpenAPI docs at `/docs`
- E2E & unit tests

---

## Quick Start

### Prerequisites

- Node.js (v18+)
- npm
- Docker (optional, for PostgreSQL)

### Setup

1. **Clone & install**

   ```bash
   git clone <your-repo-url>
   cd pet-todo-back
   npm install
   ```

2. **Environment variables**

   Copy `.env.example` to `.env` and edit as needed.

3. **Run with Docker**

   You can set up everything (including PostgreSQL) using Docker Compose.  
   Edit the `.env` file for your settings, then:

   ```bash
   docker-compose up -d
   ```

   This will start the database and the app.

4. **Run locally**

   If you prefer, start PostgreSQL yourself and run:

   ```bash
   npm run start:dev
   ```

5. **API Docs**

   Visit [http://localhost:3000/docs](http://localhost:3000/docs)

---

## Structure

```
src/
  ├── auth/         # Auth logic
  ├── user/         # User module
  ├── todo/         # Todo module
  ├── decorators/   # Custom decorators
  ├── http-exception/ # Exception filter
  └── main.ts       # Entrypoint
```

---

## Resources

- [NestJS Docs](https://docs.nestjs.com)
- [TypeORM Docs](https://typeorm.io/)
- [Swagger](https://swagger.io/)
