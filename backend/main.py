from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv
from sudachipy import tokenizer
from sudachipy import dictionary
from custom_types import Mode, LookupResponse, TextRequest, GrammarResponse
import dict_service
# Load environment variables
load_dotenv()

sudict = dictionary.Dictionary().create()
mode = tokenizer.Tokenizer.SplitMode.C

@asynccontextmanager
async def lifespan(app: FastAPI):
    dict_service.initialise_pool()
    yield
    dict_service.close_pool()

# Initialize FastAPI app
app = FastAPI(title="Language Learning API", version="1.0.0", lifespan=lifespan)

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
# API Routes
@app.get("/")
async def root():
    return {"message": "Language Learning API is running!"}

@app.post("/lookup-text", response_model=LookupResponse)
def translate(request: TextRequest):
    text = request.text
    tokenized_text = [m.surface() for m in sudict.tokenize(text, mode)]
    print(tokenized_text)
    return dict_service.get_lookup_response(tokenized_text)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "framework": "FastAPI"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

