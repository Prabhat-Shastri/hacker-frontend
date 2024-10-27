from fastapi import FastAPI, Depends
import torch
import pandas as pd
import numpy as np
import openai
from sentence_transformers import SentenceTransformer, util
from dotenv import load_dotenv
import os
from sqlalchemy.orm import Session
from model import ChatResponse, SessionLocal
from datetime import datetime, timezone
from model import Base, engine

# Ensure tables are created before starting the app
Base.metadata.create_all(bind=engine)

# Load environment variables from the .env file
load_dotenv()


# Initialize FastAPI app
app = FastAPI()

# Load OpenAI API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

# Your existing code for SentenceTransformer and embedding setup
device = "cpu"
savepath = "who.csv"
prompt = """A young user has asked you this query. If you think they are troubled and need professional help, return the following statement after the response: We suggest you seek professional help through our counselors.

Otherwise, answer their prompt to the best of your ability. Below is context about their prompt from most to least important. Give them accurate responses using the context below.
"""

# Initialize the SentenceTransformer model
trf = SentenceTransformer(model_name_or_path="all-mpnet-base-v2", device=device)

# Load the dataframe and convert embeddings from strings to arrays
df = pd.read_csv(savepath)
df['embedding'] = df['embedding'].apply(lambda x: np.fromstring(x.strip('[]'), sep=" "))
embeddings = torch.tensor(np.array(df["embedding"].tolist()), dtype=torch.float32).to(device)
chunks = df.to_dict(orient="records")

# Search index logic (your existing code)
def search_score_index(query: str, embeddings: torch.tensor, model: SentenceTransformer = trf, num_top_searches: int = 5):
    embedded_query = model.encode(query, convert_to_tensor=True)
    similarity = util.dot_score(embedded_query, embeddings)[0]
    sim, indx = torch.topk(similarity, k=num_top_searches)
    return sim, indx

def get_concatenated_info(query: str, embeddings: torch.tensor, chunks: list[dict]):
    score, indx = search_score_index(query, embeddings)
    results = []
    results.append(query)
    results.append("\n")
    results.append(prompt)
    for i in indx:
        results.append(f"Context {i+1}: {chunks[i]['chunk']}\n")
    return "".join(results)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# GET method that generates prompt and uses it with OpenAI (for gpt-3.5-turbo or newer)
@app.get("/chat")
async def chat_with_openai(user_query: str, db: Session = Depends(get_db)):
    try:
        # Generate the prompt using your context-pulling logic
        generated_prompt = get_concatenated_info(query=user_query, embeddings=embeddings, chunks=chunks)

        # Call OpenAI Chat API with the generated prompt using gpt-3.5-turbo
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # You can switch to gpt-4 if you have access
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": generated_prompt}
            ]
        )
        chatbot_response = response['choices'][0]['message']['content'].strip()

        chat_entry = ChatResponse(
            prompt=user_query,  # Store the user's original query
            response=chatbot_response,  # Store the AI's response
            timestamp=datetime.now(timezone.utc)  # Store the UTC timestamp
        )

        db.add(chat_entry)
        db.commit()

        # Return the OpenAI response and the generated prompt
        return {
            "query": user_query,
            "chatbot_response": chatbot_response
        }

    except Exception as e:
        return {"error": str(e)}

# Endpoint to retrieve chat history
@app.get("/history")
async def get_chat_history(db: Session = Depends(get_db)):
    # Query all stored chat responses ordered by timestamp
    responses = db.query(ChatResponse).order_by(ChatResponse.timestamp).all()

    # Return the history as a list of dictionaries
    return [
        {
            "prompt": response.prompt,
            "response": response.response,
            "timestamp": response.timestamp
        }
        for response in responses
    ]

from fastapi.middleware.cors import CORSMiddleware

# Add CORS middleware to allow requests from your frontend (adjust origins if necessary)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this if your frontend is served from a different URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.delete("/clear")
async def clear_chat_history(db: Session = Depends(get_db)):
    # Delete all rows in the chat_responses table
    db.query(ChatResponse).delete()
    db.commit()
    return {"message": "Chat history cleared successfully"}

# Default route for testing
@app.get("/")
async def read_root():
    return {"message": "Welcome to FastAPI"}
