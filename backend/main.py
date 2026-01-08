from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from analyzer import analyze_code

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev, allow all. In prod, specify domain.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeRequest(BaseModel):
    code: str
    language: str

from dotenv import load_dotenv
import os
from pathlib import Path
from groq_service import analyze_with_groq, optimize_code_with_groq

# Load .env from the root directory (one level up from backend)
env_path = Path(__file__).resolve().parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

print(f"DEBUG: Groq API Key found: {bool(os.getenv('GROQ_API_KEY'))}")

@app.post("/analyze")
def analyze(request: CodeRequest):
    # Try using Groq if API key is present
    if os.getenv("GROQ_API_KEY"):
        try:
            return analyze_with_groq(request.code, request.language)
        except Exception as e:
            print(f"Groq failed, falling back to static analysis: {e}")
            pass
            
    # Fallback to static analysis
    result = analyze_code(request.code, request.language)
    return result

@app.post("/optimize")
def optimize(request: CodeRequest):
    if not os.getenv("GROQ_API_KEY"):
        return {"error": "Groq API Key is missing. Cannot generate AI suggestions."}
    
    return optimize_code_with_groq(request.code, request.language)

@app.get("/")
def read_root():
    return {"message": "Code Complexity Visualizer API"}
