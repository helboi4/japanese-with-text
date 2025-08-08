# Language Learning App

A React frontend with FastAPI backend for AI-powered language learning.

## Why FastAPI?

Based on 2024 research, FastAPI is the optimal choice for AI-integrated language learning apps because:

- **Superior Performance**: Outperforms Flask in async performance under high concurrency
- **Native Async Support**: Built-in async/await makes it faster and more scalable for AI API calls
- **Industry Standard**: Specifically recommended for React + Python backend architecture
- **Beginner-Friendly**: Easy OpenAI integration with excellent documentation
- **Auto-Generated Docs**: Interactive API documentation at `/docs`

## Project Structure

```
├── backend/          # FastAPI Python backend
│   ├── main.py      # Main FastAPI application
│   ├── requirements.txt
│   └── .env.example
├── frontend/         # React frontend (to be created)
└── README.md
```

## Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

5. Run the server:
   ```bash
   python main.py
   ```

The API will be available at `http://localhost:8000` with interactive docs at `http://localhost:8000/docs`.

## API Endpoints

- `GET /` - Health check
- `POST /translate` - Translate text with learning explanation
- `POST /practice` - Generate practice exercises
- `GET /health` - System health status

## Frontend Setup (Next Steps)

Create a React app in the frontend directory:
```bash
cd frontend
npx create-react-app . --template typescript
npm install axios  # For API calls
```

## Features Implemented

- ✅ FastAPI backend with CORS support
- ✅ OpenAI integration for AI-powered features
- ✅ Text translation with explanations
- ✅ Practice exercise generation
- ✅ Type-safe API with Pydantic models
- ✅ Automatic API documentation

## Next Steps

1. Set up React frontend
2. Create language learning components
3. Implement user authentication
4. Add database for user progress
5. Enhance AI prompts for better learning outcomes

