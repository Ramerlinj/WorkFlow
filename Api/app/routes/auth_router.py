from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database.conexion import SessionLocal
from app.schemas.users import UserCreate, UserResponse, TokenResponse
from app.auth import register_user, login_user, get_current_user
from app.schemas.users import UserLogin

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    return register_user(db, payload)

@router.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    token = login_user(db, UserLogin(username=form_data.username, password=form_data.password))
    return TokenResponse(access_token=token, token_type="bearer")

@router.get("/profile", response_model=UserResponse)
def profile(user = Depends(get_current_user)):
    return user
