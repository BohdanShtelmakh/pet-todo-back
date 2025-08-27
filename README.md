# Pet TODO Backend

A simple, modern, and secure TODO API built with [NestJS](https://nestjs.com/), TypeScript, and PostgreSQL.

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

---

## Features

- User registration and authentication (JWT)
- CRUD operations for TODO items
- TODO reordering and filtering (all, completed, active)
- PostgreSQL with TypeORM
- Validation and serialization
- OpenAPI (Swagger) docs at `/docs`
- E2E and unit tests

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- Docker (for PostgreSQL, optional)

### Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd pet-todo-back
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in your database and JWT settings.

4. **Start PostgreSQL with Docker (optional)**

   ```bash
   docker-compose up -d
   ```

5. **Run the app**

   ```bash
   # development
   npm run start

   # watch mode
   npm run start:dev

   # production
   npm run build
   npm run start:prod
   ```

6. **API Documentation**

   Visit [http://localhost:3000/docs](http://localhost:3000/docs) for Swagger UI.

---

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

---

## Project Structure

```
src/
  ├── auth/         # Authentication (JWT, register, login)
  ├── user/         # User module
  ├── todo/         # Todo module (CRUD, reorder, filter)
  ├── decorators/   # Custom decorators (e.g., @Auth, @Public)
  ├── http-exception/ # Custom exception filter
  └── main.ts       # App entrypoint
```

---

## Deployment

- See [NestJS deployment docs](https://docs.nestjs.com/deployment)
- You can use Docker, cloud platforms, or [NestJS Mau](https://mau.nestjs.com) for easy deployment.

---

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Docs](https://typeorm.io/)
- [Swagger/OpenAPI](https://swagger.io/)


