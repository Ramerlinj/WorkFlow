from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from passlib.context import CryptContext

from app.database.conexion import SessionLocal
from app.models.user import User
from app.models.user_skills import UserSkill

from app.schemas.user_full import UserFullResponse
from app.schemas.professions import ProfessionResponse
from app.schemas.profile import ProfileResponse
from app.schemas.skills import SkillResponse
from app.schemas.links import LinkResponse
from app.schemas.work_experience import WorkExperienceResponse
from app.schemas.user_config import UserConfigResponse
from app.schemas.notification_settings import NotificationSettingsResponse
from app.schemas.job_applications import JobApplicationResponse
from app.schemas.testimonials import TestimonialResponse
from app.schemas.users import UserUpdate, UserCreate

# Contexto para hashing de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/user/check-availability")
def check_availability(username: str = None, email: str = None, db: Session = Depends(get_db)):
    if username:
        if db.query(User).filter_by(username=username).first():
            return {"username": "El nombre de usuario ya está en uso"}
    if email:
        if db.query(User).filter_by(email=email).first():
            return {"email": "El correo electrónico ya está en uso"}
    return {"available": "Disponible"}


@router.get("/user/{username}", response_model=UserFullResponse)
def get_user_full(username: str, db: Session = Depends(get_db)):
    
    user = (
        db.query(User)
        .options(
            joinedload(User.profession),
            joinedload(User.profile),
            joinedload(User.skills).joinedload(UserSkill.skill),
            joinedload(User.links),
            joinedload(User.work_experience),
            joinedload(User.user_config),
            joinedload(User.notification_settings),
            joinedload(User.testimonials_received),
            joinedload(User.testimonials_given),
        )
        .filter(func.lower(User.username) == username.lower())
        .first()
    )

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    resp = UserFullResponse(
        id_user=user.id_user,
        username=user.username,
        first_name=user.first_name,
        middle_name=user.middle_name,
        first_surname=user.first_surname,
        second_surname=user.second_surname,
        email=user.email,
        date_of_birth=user.date_of_birth,
        creation_date=user.creation_date,
        direction=user.direction,
        profession=(ProfessionResponse.model_validate(user.profession, from_attributes=True)
                    if user.profession else None),
        profile=(ProfileResponse.model_validate(user.profile, from_attributes=True)
                 if user.profile else None),
        user_config=(UserConfigResponse.model_validate(user.user_config, from_attributes=True)
                     if user.user_config else None),
        notification_settings=(NotificationSettingsResponse.model_validate(user.notification_settings, from_attributes=True)
                               if user.notification_settings else None),
    )

    # 3) Listas
    resp.skills = [
        SkillResponse.model_validate(us.skill, from_attributes=True)
        for us in user.skills
    ]
    resp.links = [
        LinkResponse.model_validate(link, from_attributes=True)
        for link in user.links
    ]
    resp.work_experience = [
        WorkExperienceResponse.model_validate(exp, from_attributes=True)
        for exp in user.work_experience
    ]
    resp.applications = [
        JobApplicationResponse.model_validate(app, from_attributes=True)
        for app in getattr(user, 'applications', [])
    ]
    resp.testimonials_received = [
        TestimonialResponse.model_validate(t, from_attributes=True)
        for t in user.testimonials_received
    ]
    resp.testimonials_given = [
        TestimonialResponse.model_validate(t, from_attributes=True)
        for t in user.testimonials_given
    ]

    return resp

@router.put("/user/{username}", response_model=UserFullResponse)
def update_user(username: str, data: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)

    return get_user_full(user.username, db)

@router.delete("/user/{username}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    db.delete(user)
    db.commit()
    return
