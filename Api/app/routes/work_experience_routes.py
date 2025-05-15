from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.work_experience import WorkExperience
from app.schemas.work_experience import WorkExperienceCreate, WorkExperienceResponse
from typing import List
from app.database.conexion import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/experience", response_model=WorkExperienceResponse)
def create_experience(data: WorkExperienceCreate, db: Session = Depends(get_db)):
    new_exp = WorkExperience(**data.dict())
    db.add(new_exp)
    db.commit()
    db.refresh(new_exp)
    return new_exp

@router.get("/user/experiences/{id_user}", response_model=List[WorkExperienceResponse])
def get_experiences_by_user(id_user: int, db: Session = Depends(get_db)):
    exp = db.query(WorkExperience).filter(WorkExperience.id_user == id_user).all()
    return exp

@router.put("/experience/{id_experience}", response_model=WorkExperienceResponse)
def update_experience(id_experience: int, data: WorkExperienceCreate, db: Session = Depends(get_db)):
    exp = db.query(WorkExperience).filter(WorkExperience.id_experience == id_experience).first()
    if not exp:
        raise HTTPException(status_code=404, detail="Experiencia no encontrada")
    
    for key, value in data.dict().items():
        setattr(exp, key, value)
    db.commit()
    db.refresh(exp)
    return exp

@router.delete("/experience/{id_experience}")
def delete_experience(id_experience: int, db: Session = Depends(get_db)):
    exp = db.query(WorkExperience).filter(WorkExperience.id_experience == id_experience).first()
    if not exp:
        raise HTTPException(status_code=404, detail="Experiencia no encontrada")
    
    db.delete(exp)
    db.commit()
    return {"detail": "Experiencia eliminada correctamente"}
