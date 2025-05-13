from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func

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
            # si el modelo User tuviera location:
            # joinedload(User.location).joinedload(Location.country)
        )
        .filter(func.lower(User.username) == username.lower())
        .first()
    )

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # 2) Mapeo de campos escalares
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
        # Relaciones 1:1
        profession=(ProfessionResponse.model_validate(user.profession, from_attributes=True)
                    if user.profession else None),
        profile=(ProfileResponse.model_validate(user.profile, from_attributes=True)
                 if user.profile else None),
        user_config=(UserConfigResponse.model_validate(user.user_config, from_attributes=True)
                     if user.user_config else None),
        notification_settings=(NotificationSettingsResponse.model_validate(user.notification_settings, from_attributes=True)
                               if user.notification_settings else None),
        # Si tuvieras location y country:
        # location=(LocationResponse.model_validate(user.location, from_attributes=True)
        #           if user.location else None),
        # country=(CountryResponse.model_validate(user.location.country, from_attributes=True)
        #          if user.location and user.location.country else None),
    )

    # 3) Listas (mapeo de colecciones)
    # Skills a través de user.skills → each.user_skill.skill
    resp.skills = [
        SkillResponse.model_validate(us.skill, from_attributes=True)
        for us in user.skills
    ]

    # Links
    resp.links = [
        LinkResponse.model_validate(link, from_attributes=True)
        for link in user.links
    ]

    # Experiencia laboral
    resp.work_experience = [
        WorkExperienceResponse.model_validate(exp, from_attributes=True)
        for exp in user.work_experience
    ]

    # Solicitudes de empleo (si lo incluyes)
    resp.applications = [
        JobApplicationResponse.model_validate(app, from_attributes=True)
        for app in user.applications
    ]

    # Testimonios recibidos y dados
    resp.testimonials_received = [
        TestimonialResponse.model_validate(t, from_attributes=True)
        for t in user.testimonials_received
    ]
    resp.testimonials_given = [
        TestimonialResponse.model_validate(t, from_attributes=True)
        for t in user.testimonials_given
    ]

    return resp
