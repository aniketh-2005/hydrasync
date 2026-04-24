from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from database import get_db
from models import User, WaterLog, Friend
from schemas import WaterLogCreate, WaterLogResponse, DailyProgress, WaterUpdateMessage
from auth import get_current_user
from websocket_manager import manager
from datetime import datetime, date
from typing import List

router = APIRouter(prefix="/water", tags=["water"])

def get_daily_total(db: Session, user_id: int, target_date: date = None) -> int:
    """Get total water intake for a specific day"""
    if target_date is None:
        target_date = date.today()
    
    start_of_day = datetime.combine(target_date, datetime.min.time())
    end_of_day = datetime.combine(target_date, datetime.max.time())
    
    total = db.query(func.sum(WaterLog.amount)).filter(
        and_(
            WaterLog.user_id == user_id,
            WaterLog.timestamp >= start_of_day,
            WaterLog.timestamp <= end_of_day
        )
    ).scalar()
    
    return total or 0

@router.post("/log", response_model=WaterLogResponse)
async def log_water(
    water_data: WaterLogCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Log water intake"""
    # Create water log entry
    water_log = WaterLog(
        user_id=current_user.id,
        amount=water_data.amount,
        timestamp=datetime.utcnow()
    )
    
    db.add(water_log)
    db.commit()
    db.refresh(water_log)
    
    # Calculate new daily total
    daily_total = get_daily_total(db, current_user.id)
    percentage = min((daily_total / current_user.daily_goal) * 100, 100)
    
    # Get friend IDs to notify
    friend_ids = db.query(Friend.friend_id).filter(
        Friend.user_id == current_user.id
    ).all()
    friend_ids = [f[0] for f in friend_ids]
    
    # Send WebSocket update to friends
    if friend_ids:
        message = WaterUpdateMessage(
            user_id=current_user.id,
            user_name=current_user.name,
            total=daily_total,
            goal=current_user.daily_goal,
            percentage=percentage
        ).dict()
        
        await manager.broadcast_to_friends(message, friend_ids)
    
    return WaterLogResponse.model_validate(water_log)

@router.get("/my-progress", response_model=DailyProgress)
async def get_my_progress(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current user's daily progress"""
    today = date.today()
    start_of_day = datetime.combine(today, datetime.min.time())
    end_of_day = datetime.combine(today, datetime.max.time())
    
    # Get today's logs
    logs = db.query(WaterLog).filter(
        and_(
            WaterLog.user_id == current_user.id,
            WaterLog.timestamp >= start_of_day,
            WaterLog.timestamp <= end_of_day
        )
    ).order_by(WaterLog.timestamp.desc()).all()
    
    # Calculate total
    total_intake = sum(log.amount for log in logs)
    percentage = min((total_intake / current_user.daily_goal) * 100, 100)
    
    return DailyProgress(
        total_intake=total_intake,
        daily_goal=current_user.daily_goal,
        percentage=percentage,
        logs=[WaterLogResponse.model_validate(log) for log in logs]
    )