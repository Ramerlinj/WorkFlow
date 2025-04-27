from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func

from app.database.conexion import SessionLocal
from app.model.user import User
from app.model.skills import Skill  # Importa el modelo Skill
from app.schemas.user_full import UserFullResponse
from app.schemas.skills import SkillResponse
from app.schemas.profile import ProfileResponse
from app.schemas.link import LinkResponse
from app.schemas.workexperience import WorkExperienceResponse
from app.schemas.userconfig import UserConfigResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/user/{username}", response_model=UserFullResponse)
def get_user_full(username: str, db: Session = Depends(get_db)):
    user = db.query(User).options(
        joinedload(User.profile),
        joinedload(User.skills),
        joinedload(User.links),
        joinedload(User.work_experience),
        joinedload(User.user_config)
    ).filter(func.lower(User.username) == username.lower()).first()

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Aquí hacemos la conversión correcta a los Response
    skills = []
    for user_skill in user.skills:
        skill = db.query(Skill).filter(Skill.id_skill == user_skill.id_skill).first()
        if skill:
            skills.append(SkillResponse.model_validate(skill, from_attributes=True))

    profile = None
    if user.profile:
        profile = ProfileResponse.model_validate(user.profile, from_attributes=True)

    links = [LinkResponse.model_validate(link, from_attributes=True) for link in user.links]

    work_experience = [WorkExperienceResponse.model_validate(exp, from_attributes=True) for exp in user.work_experience]

    user_config = None
    if user.user_config:
        user_config = UserConfigResponse.model_validate(user.user_config, from_attributes=True)

    return UserFullResponse(
        id_user=user.id_user,
        username=user.username,
        first_name=user.first_name,
        middle_name=user.middle_name,
        first_surname=user.first_surname,
        second_surname=user.second_surname,
        email=user.email,
        date_of_birth=user.date_of_birth,
        creation_date=user.creation_date,
        profile=profile,
        skills=skills,
        links=links,
        work_experience=work_experience,
        user_config=user_config,
    )
