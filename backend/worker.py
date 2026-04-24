"""
Cloudflare Workers adapter for HydraSync FastAPI backend
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Import your existing FastAPI app
from main import app

# Configure CORS for Cloudflare Pages
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://hydrasync.pages.dev",
        "https://*.pages.dev",
        "http://localhost:5173",  # For development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cloudflare Workers handler
async def handler(request):
    """Handle requests in Cloudflare Workers environment"""
    return await app(request.scope, request.receive, request.send)

# Export for Cloudflare Workers
__all__ = ["handler"]