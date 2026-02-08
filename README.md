# 🛒 ShopHub

ShopHub is a high-performance e-commerce application built with the modern MERN stack (minus the 'M' for local persistence, using MongoDB Atlas). It features a robust Express backend, a reactive Vite-powered frontend, and a containerized architecture for seamless deployment.

---

## 🏗️ Architecture

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | User Interface & Client Logic |
| **Backend** | Node.js + Express | RESTful API Service |
| **Database** | MongoDB (Mongoose) | Persistent Data Storage |
| **Container** | Docker + Compose | Environment Orchestration |

---

## 🚀 Quick Start (Docker)

The fastest way to get ShopHub running is using Docker. This spins up the Frontend, Backend, and a local MongoDB instance automatically.

> [!IMPORTANT]  
> Ensure **Docker Desktop** is installed and running before starting.

### 1. Start the Stack
```bash
docker compose up --build
```

### 2. Access the Application
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Local MongoDB**: `mongodb://localhost:27017`

---

## 💻 Local Development (Manual)

If you prefer to run the services directly on your machine:

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the root directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 3. Run Development Server
```bash
npm run dev
```
*This command uses `concurrently` to start both the Express server and Vite frontend.*

---

## 🗄️ Database Management

ShopHub includes built-in scripts to manage your product catalog.

### Seed Data
Populate the database with initial products:
```bash
npm run seed
```

### Reset Database
Clear all existing data and re-seed from scratch:
```bash
npm run db:reset
```

---

## 🛠️ Independent Service Control

| Service | Command | Description |
| :--- | :--- | :--- |
| **Backend** | `npm run server` | Starts only the Express API |
| **Frontend** | `npx vite` | Starts only the React App |
| **Lint** | `npm run lint` | Runs ESLint checks |
| **Seed** | `npm run seed` | Seeds product data |

---

> [!TIP]
> This project was recently migrated from Cloudflare Workers to a dedicated Express/Node.js architecture for better scalability and easier containerization.
