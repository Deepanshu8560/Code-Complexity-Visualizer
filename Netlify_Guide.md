# Deploying to Netlify

Netlify is an excellent platform for deploying modern web frontends (like your React + Vite app). 

**Note**: standard Netlify is optimized for **Frontend** (Static Assets). While it supports limited serverless functions, for a full **Python FastAPI Backend**, it is highly recommended to host the backend on a dedicated service like **Render**, **Railway**, or **Vercel** (as shown in the Vercel guide).

This guide covers deploying the **Frontend** to Netlify and connecting it to your Backend.

---

## Part 1: Deploying the Frontend (React)

### Option A: Drag & Drop (Simplest)
1.  **Build Locally**:
    Run the build command in your terminal:
    ```bash
    cd frontend
    npm run build
    ```
    This creates a `dist` folder.
2.  **Upload**:
    - Go to [Netlify Drop](https://app.netlify.com/drop).
    - Drag and drop the `dist` folder into the upload area.
    - Your site is now online!

### Option B: Import from GitHub (Recommended)
1.  Push your code to GitHub.
2.  Log in to [Netlify](https://app.netlify.com).
3.  Click **"Add new site"** -> **"Import an existing project"**.
4.  Select **GitHub** and choose your repository.
5.  **Configure Build Settings**:
    - **Base directory**: `frontend`
    - **Build command**: `npm run build`
    - **Publish directory**: `dist`
6.  Click **Deploy**.

---

## Part 2: Connecting the Backend

Since your Frontend is now on Netlify, it needs to know where your Backend is running (Netlify doesn't host the running Python server by default).

### 1. Deploy Backend (e.g., on Render)
Use a service like [Render.com](https://render.com) for the Python backend:
1.  Create a "Web Service" on Render.
2.  Connect your GitHub repo.
3.  **Root Directory**: `backend`
4.  **Build Command**: `pip install -r requirements.txt`
5.  **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6.  **Environment Variables**: Add `GROQ_API_KEY`.

### 2. Update Frontend Configuration
Once your backend is live (e.g., `https://my-backend.onrender.com`), you need to tell your Netlify Frontend to use that URL.

**In `frontend/src/components/Visualizer.jsx`**:
Replace the localhost URL with your production backend URL:

```javascript
// Replace this:
const BACKEND_URL = "http://127.0.0.1:8000";

// With your deployed URL:
const BACKEND_URL = "https://your-backend-service.onrender.com"; 
```
*(Ideally, use `import.meta.env.VITE_BACKEND_URL` and set it in Netlify Environment Variables)*.

---

## Summary
- **Frontend**: Hosted on **Netlify** (Fast, CDN-backed).
- **Backend**: Hosted on **Render/Railway/Vercel**.
- **Connection**: Frontend makes API calls to the Backend URL.
