from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.conexion import SessionLocal
from app.models.profile import Profile
from app.schemas.profile import ProfileCreate, ProfileResponse, ProfileBase
from fastapi import APIRouter

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/profile/{profile_id}", response_model=ProfileResponse)
def get_profile(profile_id: int, db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.id_profile == profile_id).first()
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Perfil no encontrado.")
    return profile

@router.put("/profile/{profile_id}", response_model=ProfileResponse)
def update_profile(profile_id: int, profile_data: ProfileBase, db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.id_profile == profile_id).first()
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Perfil no encontrado.")

    for key, value in profile_data.dict(exclude_unset=True).items():
        setattr(profile, key, value)

    db.commit()
    db.refresh(profile)
    return profile
