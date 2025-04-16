from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db

from models.user import User  # Modelo SQLAlchemy
from schemas.user_full import UserFullResponse  # Esquema Pydantic

router = APIRouter()

@router.get("/user/{username}", response_model=UserFullResponse)
def get_user_full(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user 
