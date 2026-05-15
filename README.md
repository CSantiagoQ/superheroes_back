# Backend API - ProdDigital2D

## Tech Stack

### Backend

- Node.js
- TypeScript
- Express.js

### Database

- PostgreSQL

### Data Layer

- Knex.js (migrations, seeds, query builder)
- Objection.js (ORM)

### Authentication

- JSON Web Tokens (JWT)
- bcrypt / bcryptjs

### Environment

- dotenv

### Development Tools

- tsx (TypeScript runtime)
- pnpm (package manager)
- Prettier
- ESLint (in progress)

---

## Architecture

REST API following a layered structure:

Routes → Middleware → Controllers → Models → Database

---

## Database Structure

- migrations/
- seeds/
- database.ts
