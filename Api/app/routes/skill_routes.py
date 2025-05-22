from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from typing import List

from app.database.conexion import SessionLocal
from app.models.skill import Skill
from app.models.user_skills import UserSkill
from app.schemas.skills import SkillCreate, SkillResponse
from app.schemas.user_skills import UserSkillCreate
from pydantic import BaseModel
from app.schemas.skills import SkillResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class UserSkillWithName(BaseModel):
    id_skill: int
    name: str

    class Config:
        from_attributes = True

@router.post("/skill", response_model=SkillResponse, status_code=status.HTTP_201_CREATED)
def create_skill(skill: SkillCreate, db: Session = Depends(get_db)):
    existing = db.query(Skill).filter(Skill.name == skill.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="La habilidad ya existe.")
    
    new_skill = Skill(**skill.dict())
    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)
    return new_skill

@router.get("/skills", response_model=List[SkillResponse])
def get_all_skills(db: Session = Depends(get_db)):
    return db.query(Skill).all()

@router.post("/assign", status_code=status.HTTP_201_CREATED)
def assign_skill_to_user(data: UserSkillCreate, db: Session = Depends(get_db)):
    exists = db.query(UserSkill).filter_by(id_user=data.id_user, id_skill=data.id_skill).first()
    if exists:
        raise HTTPException(status_code=400, detail="La habilidad ya fue asignada a este usuario.")
    
    new_user_skill = UserSkill(**data.dict())
    db.add(new_user_skill)
    db.commit()
    return {"message": "Habilidad asignada correctamente."}

@router.get("/user/skill/{user_id}", response_model=List[UserSkillWithName])
def get_user_skills(user_id: int, db: Session = Depends(get_db)):
    user_skills = (
        db.query(UserSkill)
        .options(joinedload(UserSkill.skill))
        .filter(UserSkill.id_user == user_id)
        .all()
    )

    return [
        UserSkillWithName(id_skill=us.skill.id_skill, name=us.skill.name)
        for us in user_skills
    ]

@router.delete("/skill/remove", status_code=204)
def remove_user_skill(data: UserSkillCreate, db: Session = Depends(get_db)):
    user_skill = db.query(UserSkill).filter_by(id_user=data.id_user, id_skill=data.id_skill).first()
    if not user_skill:
        raise HTTPException(status_code=404, detail="Esa habilidad no está asignada a este usuario.")
    
    db.delete(user_skill)
    db.commit()
    return {"message": "Habilidad removida correctamente."}
