# Deploying to Vercel

This project is configured to deploy both the React Frontend and FastAPI Backend on Vercel.

## Steps

1.  **Push to GitHub**: Ensure this project is pushed to a GitHub repository.
2.  **Import in Vercel**:
    - Go to [Vercel](https://vercel.com/new).
    - Import your repository.
3.  **Project Settings**:
    - **Framework Preset**: Vite (should be auto-detected for frontend).
    - **Root Directory**: Leave as `./` (Project Root).
4.  **Environment Variables**:
    - Add the following environment variable in the Vercel Project Settings:
        - `GROQ_API_KEY`: [Your Groq API Key]
5.  **Deploy**: Click Deploy.

## Architecture on Vercel
- **Frontend**: Served as static assets from `/`.
- **Backend**: Runs as Serverless Functions at `/api/*`.

> **Note**: The frontend API calls currently point to `http://127.0.0.1:8000`. You need to update the frontend to point to the relative `/api` path for production.

## Required Code Change for Production
In `frontend/src/components/Visualizer.jsx`, you should update the fetch URL:

```javascript
// Change this:
const response = await fetch('http://127.0.0.1:8000/analyze', ...);

// To this (relative path works for Vercel rewrites):
const response = await fetch('/api/analyze', ...);
```
