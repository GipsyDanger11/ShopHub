# ShopHub

A modern e-commerce application powered by React, Express, and MongoDB.

## Architecture

- **Frontend**: React + Vite
- **Backend**: Node.js + Express + Mongoose
- **Database**: MongoDB (Atlas or Local)

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/shophub?retryWrites=true&w=majority
   PORT=5000
   ```

3. **Database Seeding**:
   Populate the database with initial product data:
   ```bash
   npm run seed
   ```
   To reset the database (clear all data and re-seed):
   ```bash
   npm run db:reset
   ```

## Development

### Using Docker (Recommended)

Run the entire application stack:

```bash
docker compose up --build
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

### Local Development

To run both the frontend and backend concurrently:

```bash
npm run dev
```

## Running Services Independently

**Backend Only**:
```bash
npm run server
```

**Frontend Only**:
```bash
npx vite
```
