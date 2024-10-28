from sqlalchemy import Column, Integer, String, Text, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timezone

# Database setup (using SQLite)
DATABASE_URL = "sqlite:///./chat.db"  # This will create 'chat.db' locally

# SQLAlchemy engine and session
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# ChatResponse model with prompt, response, and timestamp
class ChatResponse(Base):
    __tablename__ = "chat_responses"

    id = Column(Integer, primary_key=True, index=True)
    prompt = Column(Text, nullable=False)  # User's query (prompt)
    response = Column(Text, nullable=False)  # Chatbot's response
    timestamp = Column(DateTime, default=datetime.now(timezone.utc))  # UTC timestamp

# Create the table in the database
Base.metadata.create_all(bind=engine)
