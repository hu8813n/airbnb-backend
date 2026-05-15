# airbnb-backend

A microservices-based Airbnb-style backend system built with Node.js and TypeScript.

---

## Services

| Service | Description |
|---|---|
| `HotelService` | Manages hotel listings, rooms, and availability |

---

## HotelService — Local Setup

### Prerequisites

Make sure you have the following installed before proceeding:

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/) or [MariaDB](https://mariadb.org/) running locally
- npm v9+

### 1. Clone the repository

```bash
git clone https://github.com/hu8813n/airbnb-backend.git
cd airbnb-backend/HotelService
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `HotelService` directory:

```bash
cp .env.example .env
```

Then fill in your local values:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=airbnb_hotel_dev
```

### 4. Create the database

```bash
npm run create_db
```

### 5. Run migrations

```bash
npm run migrate
```

### 6. Start the server

```bash
npm run dev
```

---

## Database Commands

| Command | Description |
|---|---|
| `npm run create_db` | Creates the database |
| `npm run migrate` | Runs all pending migrations |
| `npm run rollback` | Rolls back the last migration |

---

## Project Structure

```
HotelService/
├── src/
|   |__ config/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routers/
|   |---middlewares
|   |---utils
|   |---validatiors
│   ├── db/---------/migration
|   |               /models
|   |---dto
│   └── server.ts
├── .env.example
├── package.json
└── tsconfig.json
```

---

## Contributing

1. Create a feature branch — `git checkout -b feat/your-feature`
2. Commit your changes — `git commit -m "feat: add your feature"`
3. Push and open a PR against `main`