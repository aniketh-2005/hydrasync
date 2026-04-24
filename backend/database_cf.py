"""
Cloudflare D1 database configuration for HydraSync
"""
import os
from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Use Cloudflare D1 database in production
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./hydrasync.db")

# For Cloudflare D1, we'll use a different approach
if "D1" in os.environ:
    # Cloudflare D1 database connection
    # This will be handled by Cloudflare Workers runtime
    engine = None
    SessionLocal = None
    Base = declarative_base()
else:
    # Local development with SQLite
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base = declarative_base()

def get_db():
    """Database dependency for FastAPI"""
    if SessionLocal:
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()
    else:
        # Handle D1 database connection
        # This would be implemented with Cloudflare's D1 client
        pass

def create_tables():
    """Create all tables"""
    if engine:
        Base.metadata.create_all(bind=engine)
    else:
        # Handle D1 table creation
        pass