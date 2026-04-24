from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import User, Friend
from schemas import FriendAdd, FriendResponse, FriendStatus
from auth import get_current_user
from routes.water import get_daily_total
from typing import List

router = APIRouter(prefix="/friends", tags=["friends"])

@router.post("/add", response_model=FriendResponse)
async def add_friend(
    friend_data: FriendAdd,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Add a friend by email"""
    # Find user by email
    friend_user = db.query(User).filter(User.email == friend_data.email).first()
    if not friend_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Check if trying to add self
    if friend_user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot add yourself as friend"
        )
    
    # Check if friendship already exists
    existing_friendship = db.query(Friend).filter(
        Friend.user_id == current_user.id,
        Friend.friend_id == friend_user.id
    ).first()
    
    if existing_friendship:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already friends with this user"
        )
    
    # Create friendship
    friendship = Friend(
        user_id=current_user.id,
        friend_id=friend_user.id
    )
    
    db.add(friendship)
    db.commit()
    
    return FriendResponse.model_validate(friend_user)

@router.get("/list", response_model=List[FriendResponse])
async def get_friends(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's friend list"""
    friends = db.query(User).join(
        Friend, Friend.friend_id == User.id
    ).filter(Friend.user_id == current_user.id).all()
    
    return [FriendResponse.model_validate(friend) for friend in friends]

@router.get("/status", response_model=List[FriendStatus])
async def get_friends_status(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get friends' hydration status"""
    friends = db.query(User).join(
        Friend, Friend.friend_id == User.id
    ).filter(Friend.user_id == current_user.id).all()
    
    friends_status = []
    for friend in friends:
        current_intake = get_daily_total(db, friend.id)
        percentage = min((current_intake / friend.daily_goal) * 100, 100)
        
        # Determine status
        if percentage >= 100:
            status = "goal_reached"
        elif percentage >= 50:
            status = "halfway"
        else:
            status = "low"
        
        friends_status.append(FriendStatus(
            friend=FriendResponse.model_validate(friend),
            current_intake=current_intake,
            daily_goal=friend.daily_goal,
            percentage=percentage,
            status=status
        ))
    
    return friends_status