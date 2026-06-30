# DSA Mastery Platform — Deployment Guide

## Architecture
- **Frontend**: React (Vite) → Vercel
- **Backend**: Node.js + Express → Render/Railway
- **Database**: PostgreSQL → Neon / Render PostgreSQL / ElephantSQL
- **Code Execution**: Judge0 CE (RapidAPI or self-hosted Docker)

---

## 1. MySQL Setup

### Local MySQL
```bash
# Make sure MySQL is running, then create the database
mysql -u admin -p -e "CREATE DATABASE dsa_mastery;"
```

### Production MySQL (e.g. Aiven, PlanetScale, or Render MySQL)
1. Create a MySQL instance from your provider of choice.
2. Note the host, port, database name, user, and password.
3. Update `backend/.env`:
   ```
   DB_HOST=your-mysql-host
   DB_PORT=3306
   DB_NAME=dsa_mastery
   DB_USER=admin
   DB_PASS=password
   ```

---

## 2. Judge0 Setup

### Option A: RapidAPI (easiest)
1. Go to https://rapidapi.com/judge0-official/api/judge0-ce
2. Subscribe (free tier: 50 requests/day)
3. Copy your `X-RapidAPI-Key`

### Option B: Self-Hosted (Docker, unlimited)
```bash
docker run -d --name judge0 -p 2358:2358 judge0/judge0:latest
```
Then set `JUDGE0_URL=http://your-server-ip:2358` and leave `RAPIDAPI_KEY=""`.

---

## 3. Backend Deployment (Render)

1. Push code to GitHub.
2. Go to https://render.com → New Web Service.
3. Connect your repo, set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `JUDGE0_URL` = RapidAPI URL or self-hosted URL
   - `RAPIDAPI_KEY` = your RapidAPI key (leave empty if self-hosted)
   - `PORT` = 5000 (Render sets this automatically)
5. Deploy. Note your backend URL (e.g., `https://dsa-mastery-backend.onrender.com`).

---

## 4. Frontend Deployment (Vercel)

1. Push code to GitHub.
2. Go to https://vercel.com → Add New Project.
3. Connect your repo, set:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable:
   - `VITE_API_URL` = your Render backend URL (e.g., `https://dsa-mastery-backend.onrender.com/api`)
5. Deploy.

### Vite proxy removal for production
In `vite.config.js`, the proxy is only for local dev. For production, the frontend calls the backend directly via `VITE_API_URL`. Update the `api.js` service:

```js
const BASE_URL = import.meta.env.VITE_API_URL || "/api";
const client = axios.create({ baseURL: BASE_URL });
```

---

## 5. Seed the Database

After deploying the backend, run the seed script once:

```bash
# Locally (pointing to Atlas)
MONGO_URI="your_atlas_uri" npm run seed
```

Or via Render Shell:
```bash
# Open Render shell for your backend service
npm run seed
```

---

## 6. Verify Deployment

1. Visit your Vercel frontend URL.
2. Check that topics load from the backend.
3. Try running a problem (needs Judge0 configured).

---

## Environment Variables Summary

| Variable | Where | Purpose |
|----------|-------|---------|
| `DB_HOST` / `DB_PORT` / `DB_NAME` / `DB_USER` / `DB_PASS` | Backend | MySQL connection details |
| `JUDGE0_URL` | Backend | Judge0 API endpoint |
| `RAPIDAPI_KEY` | Backend | RapidAPI key for Judge0 |
| `VITE_API_URL` | Frontend | Backend API URL for production |

---

## Local Development

```bash
# Terminal 1: Backend
cd backend
npm install
cp .env.example .env  # fill in values
npm run seed
npm run dev

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:5000
