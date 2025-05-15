from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from passlib.context import CryptContext

from app.database.conexion import SessionLocal
from app.models.user import User
from app.models.skill import Skill
from app.models.testimonials import Testimonial
from app.models.user_skills import UserSkill

from app.schemas.user_full import UserFullResponse
from app.schemas.professions import ProfessionResponse
from app.schemas.countries import CountryResponse
from app.schemas.locations import LocationResponse
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

@router.get("/user/{username}", response_model=UserFullResponse)
def get_user_full(username: str, db: Session = Depends(get_db)):
    # 1) Query con joinedload de todas las relaciones
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

@router.post("/user/", response_model=UserFullResponse, status_code=status.HTTP_201_CREATED)
def create_user(data: UserCreate, db: Session = Depends(get_db)):
    # 1. Verifica unicidad
    if db.query(User).filter_by(username=data.username).first():
        raise HTTPException(status_code=400, detail="Username ya existe")
    if db.query(User).filter_by(email=data.email).first():
        raise HTTPException(status_code=400, detail="Email ya está en uso")

    # 2. Hashea la contraseña
    hashed_pw = hash_password(data.password)

    # 3. Crea nuevo objeto
    new_user = User(
        id_profession=data.id_profession,
        username=data.username,
        email=data.email,
        hash_password=hashed_pw,
        first_name=data.first_name,
        middle_name=data.middle_name,
        first_surname=data.first_surname,
        second_surname=data.second_surname,
        date_of_birth=data.date_of_birth,
        direction=data.direction,
        creation_date=func.now()
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return get_user_full(new_user.username, db)

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
