# TaskFlow — Mini Project Management Portal

A full-stack task management application featuring an editorial, premium design aesthetic inspired by **Lacoste Heritage 2026**. Users can register/log in, create tasks, manage them, view analytics, and customize their interface, all running on a fully secured JWT authentication layer.

**Live Application Demo:**
* **Frontend Static Site:** [https://taskflow-client-tk0l.onrender.com](https://taskflow-client-tk0l.onrender.com)
* **Backend API Service:** [https://taskflow-api-i17s.onrender.com](https://taskflow-api-i17s.onrender.com)

**Stack:** React.js (frontend) · Node.js + Express (backend) · MongoDB + Mongoose (database)

---

## 🎨 Premium Editorial Design Aesthetic

The application is styled using a custom design language inspired by modern, premium editorial interfaces:
* **Maison Color Palette**: Features a warm off-white *Farine* canvas (`#f7f4ef`), *Clay* accents (`#c8a882`), and deep *Forest Green* (`#1a3a2a`) brand highlights.
* **Atelier Evening Mode**: A custom, dark-theme variant featuring warm charcoal canvas (`#141210`) and soft desaturated forest tones.
* **Refined Typography**: Uses editorial serif headings combined with minimalist geometric numerals for dashboard metrics.
* **Micro-interactions**: Underline-only input focus shifts, sliding underline navigation indicators, and card borders that draw upwards on hover.

---

## 1. Project Structure

```
project-root/
├─ frontend/
│  ├─ src/
│  │  ├─ components/   # Reusable UI: Navbar, TaskCard, FilterBar, StatsBar, etc.
│  │  ├─ pages/        # Route views: Dashboard, AddTask, Login, Register
│  │  ├─ services/     # Axios API client (api.js, authService, taskService)
│  │  ├─ context/      # AuthContext (JWT session), ThemeContext (dark mode)
│  │  └─ styles/       # Design system tokens (global.css) and layout rules (ui.css)
│  ├─ public/          # Static assets & SPA redirects configuration (_redirects)
│  └─ vercel.json      # Client-side routing configuration for Vercel
└─ backend/
   ├─ routes/          # Express route definitions
   ├─ controllers/     # Request handlers & business logic
   ├─ models/          # Mongoose schemas (Task, User)
   ├─ middleware/      # JWT auth guard, robust CORS resolver, error handlers
   ├─ config/          # MongoDB connection
   └─ tests/           # Jest + Supertest API tests
```

---

## 2. Setup Steps

### Prerequisites
- Node.js 18+
- A MongoDB instance (local or MongoDB Atlas cluster)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd project-root
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create a .env file and set PORT, MONGO_URI, and JWT_SECRET
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   # Start the development server (runs on http://localhost:3000)
   npm start
   ```

### Running Backend Tests
```bash
cd backend
npm test              # Runs Jest + Supertest (uses an in-memory MongoDB)
```

---

## 3. Production Deployment Guide (Render)

This project is optimized for separated deployment (Option C) on **Render**:

### Backend Deployment (Web Service)
1. Create a **Web Service** on Render pointing to your repository.
2. Set **Root Directory** to `backend`.
3. Set **Build Command** to `npm install` and **Start Command** to `npm start`.
4. Configure the following **Environment Variables**:
   * `NODE_ENV`: `production`
   * `MONGO_URI`: `[Your MongoDB Atlas Connection String]`
   * `JWT_SECRET`: `[A long random secret phrase]`
   * `CLIENT_ORIGIN`: `https://taskflow-client-tk0l.onrender.com` (Your deployed frontend URL)

### Frontend Deployment (Static Site)
1. Create a **Static Site** on Render pointing to your repository.
2. Set **Root Directory** to `frontend`.
3. Set **Build Command** to `npm run build` and **Publish Directory** to `build`.
4. Configure the following **Environment Variable**:
   * `REACT_APP_API_BASE_URL`: `https://taskflow-api-i17s.onrender.com/api` (Your deployed backend API URL + `/api`)

---

## 4. API Documentation

Base URL: `http://localhost:5000/api` (Local) or `https://taskflow-api-i17s.onrender.com/api` (Production)

All `/tasks/*` routes require a JWT in the `Authorization: Bearer <token>` header.

### Auth

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/auth/register` | `{ name, email, password }` | Create account, returns `{ token, user }` |
| POST | `/auth/login` | `{ email, password }` | Log in, returns `{ token, user }` |
| GET | `/auth/me` | — | Returns current authenticated user |

### Tasks

| Method | Endpoint | Body / Query | Description |
|---|---|---|---|
| GET | `/tasks` | `?status=&search=&sort=&page=&limit=` | List user's tasks (filtered, paginated, sorted) |
| GET | `/tasks/stats` | — | Fetch task metrics |
| POST | `/tasks` | `{ title, description, status? }` | Create a task |
| PUT | `/tasks/:id` | `{ status?, title?, description? }` | Update a task status or body |
| DELETE | `/tasks/:id` | — | Delete a task |
