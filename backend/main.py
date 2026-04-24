from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import create_tables, get_db
from websocket_manager import manager
from auth import verify_token
from routes import user, water, friends
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="HydraSync API",
    description="Real-time social water tracking application",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user.router)
app.include_router(water.router)
app.include_router(friends.router)

@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    create_tables()
    logger.info("Database tables created")

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "HydraSync API is running"}

@app.websocket("/ws/{token}")
async def websocket_endpoint(websocket: WebSocket, token: str):
    """WebSocket endpoint for real-time updates"""
    try:
        # Verify token and get user ID
        token_data = verify_token(token)
        user_id = token_data["user_id"]
        
        # Connect user
        await manager.connect(websocket, user_id)
        
        try:
            # Keep connection alive
            while True:
                # Wait for messages (ping/pong to keep connection alive)
                data = await websocket.receive_text()
                logger.info(f"Received message from user {user_id}: {data}")
                
        except WebSocketDisconnect:
            logger.info(f"User {user_id} disconnected")
        finally:
            manager.disconnect(user_id)
            
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        await websocket.close(code=1008)  # Policy violation

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)