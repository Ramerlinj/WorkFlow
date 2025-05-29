from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.conexion import SessionLocal
from app.schemas.profile import ProfileBase, ProfileCreate, ProfileResponse
from app.models.profile import Profile
from app.models.user import User


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/{username}", response_model=ProfileResponse)
def read_profile(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user or not user.profile:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")
    return user.profile

@router.post("/{username}", response_model=ProfileResponse, status_code=status.HTTP_201_CREATED)
def create_profile(username: str, profile_in: ProfileCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    if user.profile:
        raise HTTPException(status_code=400, detail="Perfil ya existe")
    profile = Profile(
        id_user=user.id_user,
        about_me=profile_in.about_me,
        avatar_url=profile_in.avatar_url,
        cv_url=profile_in.cv_url,
    )
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile

@router.put("/{username}", response_model=ProfileResponse)
def update_profile(username: str, profile_in: ProfileBase, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user or not user.profile:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")
    # Actualizar solo los campos enviados
    update_data = profile_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user.profile, field, value)
    db.commit()
    db.refresh(user.profile)
    return user.profile
