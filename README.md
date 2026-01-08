# 🚀 Code Complexity Visualizer

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Python](https://img.shields.io/badge/python-3.9+-blue.svg) ![React](https://img.shields.io/badge/react-18+-61DAFB.svg) ![Groq](https://img.shields.io/badge/AI-Groq-orange)

A powerful, real-time code analysis tool that visualizes Time and Space complexity while providing AI-driven optimization suggestions. Built with modern web technologies and powered by the **Groq AI** engine (Llama 3.1).

---

## ✨ Features

- **📊 Real-Time Visualization**: Dynamic graphs plotting complexity curves (O(n), O(log n), etc.) against your code's performance.
- **⚡ AI Optimization & Refactoring**: Instant, actionable suggestions to improve efficiency, powered by Groq's Llama 3.1.
- **🔍 Deep Metric Analysis**: detailed breakdown of loops, recursion depth, conditionals, and array operations.
- **🎨 Modern UI/UX**: A responsive, dark-mode capability interface built with React and Tailwind CSS.
- **📈 Complexity Badges**: Visual indicators for Time (Time Complexity) and Space (Space Complexity).

---

## 🛠️ Tech Stack

### Frontend
- **React.js (Vite)**: Fast, modular component-based UI.
- **Tailwind CSS**: Utility-first styling for a sleek design.
- **Recharts**: For rendering interactive complexity charts.
- **Lucide React**: Beautiful, consistent iconography.

### Backend
- **FastAPI**: High-performance Python web framework.
- **Groq API**: Ultra-fast AI inference using the Llama 3.1 model.
- **Python**: Core logic for static code analysis.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
- **Node.js** (v16+)
- **Python** (v3.9+)
- **Groq API Key** (Get one [here](https://console.groq.com))

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/code-complexity-visualizer.git
cd code-complexity-visualizer
```

### 2️⃣ Backend Setup
Navigate to the backend folder and set up the environment.

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

**Configure Environment Variables:**
Create a `.env` file in the `backend` directory:
```ini
GROQ_API_KEY=your_actual_groq_api_key_here
```

**Run the Server:**
```bash
uvicorn main:app --reload
# Runs on http://127.0.0.1:8000
```

### 3️⃣ Frontend Setup
Open a new terminal and navigate to the frontend folder.

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## ☁️ Deployment

This project is configured for easy deployment on **Vercel**.

1. Import the repository to Vercel.
2. Add your `GROQ_API_KEY` in the Vercel Project Settings.
3. The included `vercel.json` handles the build for both Python service and React app.

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
