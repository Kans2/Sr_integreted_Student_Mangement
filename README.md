# Integrated Student Management System

A full-stack, modern student management portal designed for ease of use, responsiveness, and seamless deployment. 

The project connects a fast and scalable **NestJS API** with a rich, interactive **React (Vite)** frontend.

## 🚀 Key Features

*   **Full CRUD Functionality:** Create, read, update, and securely delete student records.
*   **Unified Deployment Flow:** The frontend is statically built and efficiently served by the NestJS backend, allowing the entire full-stack application to be deployed as a single, low-latency web service on platforms like Render.
*   **Modern Interactive UI:** A clean, glassmorphic design utilizing Tailwind CSS concepts, SweetAlert2 alerts, and responsive data tables.
*   **Excel Export:** Allows users to easily download and export student tables to an Excel spreadsheet with a click of a button.

## 🛠️ Technology Stack

**Frontend**
*   **React** (built with Vite for high performance)
*   **Vanilla CSS** (custom modern glassmorphism styling)
*   **SweetAlert2** (rich popups and success/error notifications)
*   **Lucide React** (modern iconography)

**Backend**
*   **NestJS** (Enterprise-ready Node.js framework)
*   **TypeORM** (robust, object-relational mapping)
*   **PostgreSQL** (scalable SQL database)
*   `@nestjs/serve-static` (serving the compiled React UI directly)

---

## 💻 Local Development

Before you begin, ensure you have **Node.js** (v20+) and **NPM** installed on your machine.
You will also need a **PostgreSQL** database running (either locally or on a cloud provider like Neon or Supabase).

### 1. Database Setup
Create an `.env` file in the `backend/` directory:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/your_database_name
```

### 2. Running Locally in Development Mode
The easiest way to develop is to run the frontend and backend on separate development servers:

**Backend Server (Runs on Port 3000):**
```bash
cd backend
npm install
npm run start:dev
```

**Frontend Server (Runs on Vite's Port):**
```bash
cd frontend
npm install
npm run dev
```
*(Note: During local development, the frontend proxy or logic will correctly route API requests to the local backend.)*

---
