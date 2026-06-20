# TaskFlow — Mini Project Management Portal

A full-stack task management app built for the o2h Full Stack Application Developer
assessment. Users can register/log in, create tasks, mark them complete, delete them,
filter by status, search, sort, paginate, and view dashboard stats — all behind JWT
authentication.

**Stack:** React.js (frontend) · Node.js + Express (backend) · MongoDB + Mongoose

---

## 1. Project structure

```
project-root/
├─ frontend/
│  ├─ src/
│  │  ├─ components/   # Reusable UI: Navbar, TaskCard, FilterBar, StatsBar, etc.
│  │  ├─ pages/         # Route-level views: Dashboard, AddTask, Login, Register
│  │  ├─ services/      # Axios API clients (authService, taskService)
│  │  └─ context/       # AuthContext (JWT session), ThemeContext (dark mode)
│  └─ public/
└─ backend/
   ├─ routes/           # Express route definitions
   ├─ controllers/      # Request handlers / business logic
   ├─ models/           # Mongoose schemas (Task, User)
   ├─ middleware/        # JWT auth guard, centralized error handler
   ├─ config/           # MongoDB connection
   └─ tests/            # Jest + Supertest API tests
```

---

## 2. Setup steps

### Prerequisites
- Node.js 18+
- A MongoDB instance — either local (`mongodb://127.0.0.1:27017`) or a free
  [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### Clone
```bash
git clone <your-repo-url>
cd project-root
```

### Backend
```bash
cd backend
npm install
cp .env.example .env
# edit .env and set MONGO_URI / JWT_SECRET if needed
npm run dev          # starts on http://localhost:5000 with nodemon
# or: npm start       # production start
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# edit .env if your backend isn't on http://localhost:5000
npm start             # starts on http://localhost:3000
```

### Run backend tests
```bash
cd backend
npm test              # Jest + Supertest, uses an in-memory MongoDB
```

> Note: `mongodb-memory-server` downloads a MongoDB binary on first run. If your
> network blocks that download, run tests against a local MongoDB instead, or
> point `MONGO_URI` in `.env` at a disposable test database.

---

## 3. Assumptions

- **Auth is per-user**: each task belongs to the user who created it (`user` field
  on the Task model). Task list, stats, and mutations are scoped to `req.user.id` —
  one account never sees another account's tasks. This wasn't explicit in the brief
  but is the only sensible behavior once JWT login is added.
- **Status values** are fixed to `Pending`, `In Progress`, `Completed` (enum on the
  backend). The "Add Task" form only offers Pending/In Progress per the brief —
  tasks move to Completed via the dashboard's "Mark complete" action.
- **Description minimum (20 chars)** is enforced both client-side (inline form
  validation) and server-side (Mongoose schema + controller check), since the brief
  listed it as a validation requirement.
- **Soft confirmation on delete**: the Delete button requires a second click
  ("Click again to confirm") instead of a browser `confirm()` dialog, to keep the
  UI consistent and testable.
- **Pagination default**: 9 tasks per page (grid of 3×3) on the dashboard; the API
  itself defaults to 10 and accepts `limit` up to 100.
- **No PHP/Laravel variant**: the brief offered Node/Express OR PHP/Laravel; this
  submission uses Node/Express throughout.
- **Dark mode** preference is stored in `localStorage` and applied via a
  `data-theme` attribute, no backend involvement.

---

## 4. API documentation

Base URL: `http://localhost:5000/api`

All `/tasks/*` routes require a JWT in the `Authorization: Bearer <token>` header.

### Auth

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/auth/register` | `{ name, email, password }` | Create an account, returns `{ token, user }` |
| POST | `/auth/login` | `{ email, password }` | Log in, returns `{ token, user }` |
| GET | `/auth/me` | — | Returns the current authenticated user (requires token) |

### Tasks

| Method | Endpoint | Body / Query | Description |
|---|---|---|---|
| GET | `/tasks` | `?status=&search=&sort=&page=&limit=` | List the current user's tasks (filter/search/sort/paginate) |
| GET | `/tasks/stats` | — | `{ totalTasks, pendingTasks, inProgressTasks, completedTasks }` |
| POST | `/tasks` | `{ title, description, status? }` | Create a task |
| PUT | `/tasks/:id` | `{ status?, title?, description? }` | Update a task (e.g. mark complete) |
| DELETE | `/tasks/:id` | — | Delete a task |

**GET /tasks query params**

| Param | Example | Notes |
|---|---|---|
| `status` | `Pending` \| `In Progress` \| `Completed` | Exact match filter |
| `search` | `login` | Case-insensitive match on title or description |
| `sort` | `-created_at` (default) \| `created_at` | `-` prefix = descending |
| `page` | `1` | 1-indexed |
| `limit` | `10` | Max 100 |

**Example: create a task**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build Login Page",
    "description": "Create a responsive login page",
    "status": "Pending"
  }'
```

**Example response shape (GET /tasks)**
```json
{
  "data": [
    {
      "_id": "665f1c2e9a1b2c3d4e5f6789",
      "title": "Build Login Page",
      "description": "Create a responsive login page",
      "status": "Pending",
      "user": "665f1c0a9a1b2c3d4e5f6700",
      "created_at": "2026-06-18T10:22:00.000Z",
      "updated_at": "2026-06-18T10:22:00.000Z"
    }
  ],
  "pagination": { "total": 1, "page": 1, "limit": 10, "totalPages": 1 }
}
```

All error responses follow `{ "message": "..." }` with an appropriate HTTP status
code (400 validation, 401 unauthorized, 404 not found, 409 conflict, 500 server).

---

## 5. Features implemented

**Core**
- [x] View all tasks (cards, dashboard)
- [x] Create a new task (with validation)
- [x] Mark a task as completed
- [x] Delete a task
- [x] Filter tasks by status
- [x] Responsive, mobile-friendly UI
- [x] Loading indicator (skeleton grid) while fetching
- [x] Empty state when no tasks exist
- [x] Dark mode toggle (bonus)

**Advanced**
- [x] User login (JWT authentication, tasks scoped per user)
- [x] Search tasks (title/description)
- [x] Pagination
- [x] Sort by created date
- [x] Dashboard statistics (total / pending / in progress / completed)
- [x] Unit tests (Jest + Supertest, in-memory MongoDB)

---

## 6. Suggested commit history

```
Initial project setup
Implemented task APIs
Added React Dashboard
Integrated frontend with backend
Added JWT authentication
Added search, pagination, sort and stats
Added unit tests
Updated README
```
