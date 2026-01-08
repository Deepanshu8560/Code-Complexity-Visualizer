# 🚀 Deployment Guide

This project consists of a **React Frontend** and a **FastAPI Backend**. You can deploy them together (Vercel) or separately (Netlify + Render).

---

## 🟢 Option 1: Vercel (Recommended - All-in-One)
Vercel can host both the frontend and the Python backend in a single repository.

### 1. Configuration File
Create a `vercel.json` file in your root directory:
```json
{
  "version": 2,
  "builds": [
    { "src": "backend/main.py", "use": "@vercel/python" },
    { "src": "frontend/package.json", "use": "@vercel/static-build", "config": { "distDir": "dist" } }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/backend/main.py" },
    { "src": "/(.*)", "dest": "/frontend/$1" }
  ]
}
```

### 2. Deploy
1.  Push your code to **GitHub**.
2.  Import the project in [Vercel](https://vercel.com).
3.  **Environment Variables**: Add `GROQ_API_KEY` in Vercel Project Settings.
4.  **Frontend Update**: In `frontend/src/components/Visualizer.jsx`, ensure you fetch from `/api/analyze` instead of `http://127.0.0.1:8000`.

---

## 🔵 Option 2: Netlify (Frontend) + Render (Backend)
Best for free tier usage if you prefer separating services.

### Part A: Backend (Render.com)
1.  Create a **Web Service** on [Render](https://render.com).
2.  Connect your GitHub repo.
3.  **Settings**:
    - **Root Directory**: `backend`
    - **Build Command**: `pip install -r requirements.txt`
    - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
    - **Env Vars**: Add `GROQ_API_KEY`.
4.  Copy your new Backend URL (e.g., `https://my-app.onrender.com`).

### Part B: Frontend (Netlify)
1.  **Configuration**: Create a `netlify.toml` in your root to handle routing:
    ```toml
    [build]
      base = "frontend"
      publish = "dist"
      command = "npm run build"

    [[redirects]]
      from = "/*"
      to = "/index.html"
      status = 200
    ```
2.  **Deploy**: Import your repo to [Netlify](https://netlify.com).
3.  **Update Config**: In `frontend/src/components/Visualizer.jsx`, replace `http://127.0.0.1:8000` with your Render Backend URL.

---

## 🔑 Environment Variables
For both options, you **MUST** set the `GROQ_API_KEY` in the hosting provider's dashboard. Do not commit your `.env` file.
