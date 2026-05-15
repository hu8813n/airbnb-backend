# BookingService

Handles all booking lifecycle operations — creation, confirmation, cancellation, and availability checks — as part of the `airbnb-backend` microservices system.

---

## Tech Stack

- **Runtime** — Node.js + TypeScript
- **Framework** — Express
- **ORM** — Prisma 7 (with MariaDB driver adapter)
- **Database** — MariaDB / MySQL
- **Cache / Locks** — Redis + Redlock
- **Validation** — Zod
- **Logging** — Winston

---

## Local Setup

### Prerequisites

- Node.js v18+
- MariaDB or MySQL running locally
- Redis running locally
- npm v9+

### 1. Clone the repository

```bash
git clone https://github.com/your-username/airbnb-backend.git
cd airbnb-backend/BookingService
```

### 2. Install dependencies

```bash
npm install
```

> `postinstall` will automatically run `prisma generate` to build the Prisma Client.

### 3. Configure environment variables

```bash
cp .env.example .env
```

Fill in your local values:

```env
PORT=3001
DATABASE_URL="mysql://root:root123@localhost:3306/airbnb_booking_dev"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
DATABASE_USER="root"
DATABASE_PASSWORD="root123"
DATABASE_NAME="airbnb_booking_dev"
REDIS_URL="redis://localhost:6379"
LOCK_TTL=50000
```

### 4. Create the database

Make sure your MariaDB instance is running, then create the database manually:

```bash
mysql -u root -p -e "CREATE DATABASE airbnb_booking_dev;"
```

### 5. Run Prisma migrations

```bash
npx prisma migrate dev --schema=./src/prisma/schema.prisma
```

### 6. Start the server

```bash
# Development
npm run dev

# Production
npm start
```

---

## Database Commands

| Command | Description |
|---|---|
| `npx prisma migrate dev` | Create and apply a new migration |
| `npx prisma migrate deploy` | Apply migrations in production |
| `npx prisma migrate reset` | Drop DB, re-run all migrations + seeders |
| `npx prisma studio` | Open Prisma's visual DB browser |
| `npx prisma generate` | Regenerate Prisma Client after schema changes |

> Always pass `--schema=./src/prisma/schema.prisma` if your schema is not at the default path.

---

## Project Structure

```
BookingService/
├── src/
│   ├── config/              # DB, Redis, and app configuration
│   ├── controllers/         # Route handlers (thin layer, delegates to services)
│   ├── dto/                 # Data Transfer Object types
│   ├── middlewares/         # Auth, error handling, request logging
│   ├── prismarepositories/  # Prisma DB access layer
│   ├── services/            # Core business logic
│   ├── utils/               # Shared helpers and utilities
│   ├── validators/          # Zod schemas for request validation
│   └── server.ts            # App entry point
├── src/prisma/
│   └── schema.prisma        # Prisma schema and data models
├── .env
├── package.json
└── tsconfig.json
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/bookings` | Create a new booking |


> Update this table as new routes are added.

---
