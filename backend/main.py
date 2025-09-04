from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv
from sudachipy import tokenizer
from sudachipy import dictionary
# Load environment variables
load_dotenv()

sudict = dictionary.Dictionary().create()
mode = tokenizer.Tokenizer.SplitMode.C

# Initialize FastAPI app
app = FastAPI(title="Language Learning API", version="1.0.0")

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
openai.api_key = os.getenv("OPENAI_API_KEY")

# Pydantic models for request/response
class TextRequest(BaseModel):
    text: str
    target_language: str = "Japanese"
    user_level: str = "beginner"

class GrammarResponse(BaseModel):
    original_text: str
    translated_text: str
    explanation: str
    difficulty_level: str

class TranslatedWord(BaseModel):
    original_word: str
    dict_entries: list
    dict_chars: list

class TranslateResponse(BaseModel):
    translated_words: list[TranslatedWord]
    

# API Routes
@app.get("/")
async def root():
    return {"message": "Language Learning API is running!"}

@app.post("/translate-text", response_model=TranslateResponse)
def translate(request: TextRequest):
    tokenized_text = [m.surface() for for m in sudict.tokenize(text, mode)]
    translated_words = []
    return TranslateResponse(translated_words=translated_words)
        

@app.post("/grammar", response_model=GrammarResponse)
def explain_grammar(request: TextRequest):
    """Translate text and provide learning explanation"""
    try:
        response = openai.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": f"You are a helpful language learning assistant who is an expert in Japanese grammar. Translate the given text to {request.target_language} and provide a beginner-friendly explanation of the grammar concepts with extra example sentences which make the grammar concepts easier to understand."
                },
                {
                    "role": "user",
                    "content": f"Translate this text to {request.target_language} and explain the reasoning beind the grammar in it for a {request.user_level} Japanese language learner: {request.text}"
                }
            ]
        )
        
        # Parse the AI response (you might want to structure this better)
        ai_response = response.choices[0].message.content
        
        return GrammarResponse(
            original_text=request.text,
            translated_text=ai_response.split('\n')[0],  # Simplified parsing
            explanation=ai_response,
            difficulty_level=request.user_level
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "framework": "FastAPI"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

