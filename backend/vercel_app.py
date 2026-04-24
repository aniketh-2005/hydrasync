"""
Vercel serverless function adapter for HydraSync
"""
from main import app

# Export the FastAPI app for Vercel
handler = app