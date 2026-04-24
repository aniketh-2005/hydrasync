from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional

# User schemas
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    daily_goal: Optional[int] = 2000

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UpdateGoal(BaseModel):
    daily_goal: int

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    daily_goal: int
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# Water logging schemas
class WaterLogCreate(BaseModel):
    amount: int

class WaterLogResponse(BaseModel):
    id: int
    amount: int
    timestamp: datetime
    
    class Config:
        from_attributes = True

class DailyProgress(BaseModel):
    total_intake: int
    daily_goal: int
    percentage: float
    logs: List[WaterLogResponse]

# Friends schemas
class FriendAdd(BaseModel):
    email: str

class FriendResponse(BaseModel):
    id: int
    name: str
    email: str
    
    class Config:
        from_attributes = True

class FriendStatus(BaseModel):
    friend: FriendResponse
    current_intake: int
    daily_goal: int
    percentage: float
    status: str  # "low", "halfway", "goal_reached"

# WebSocket message schemas
class WaterUpdateMessage(BaseModel):
    type: str = "WATER_UPDATE"
    user_id: int
    user_name: str
    total: int
    goal: int
    percentage: float