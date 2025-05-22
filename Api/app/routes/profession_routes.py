from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from app.database.conexion import SessionLocal
from app.models.profession import Profession
from app.schemas.professions import ProfessionCreate, ProfessionResponse

router = APIRouter()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/profession", response_model=ProfessionResponse, status_code=status.HTTP_201_CREATED)
def create_profession(profession: ProfessionCreate, db: Session = Depends(get_db)):
    existing = db.query(Profession).filter_by(name=profession.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="La profesión ya existe.")
    
    new_profession = Profession(**profession.dict())
    db.add(new_profession)
    db.commit()
    db.refresh(new_profession)
    return new_profession

@router.get("/profession", response_model=list[ProfessionResponse])
def get_professions(db: Session = Depends(get_db)):
    return db.query(Profession).all()

@router.put("/profession/{profession_id}", response_model=ProfessionResponse)
def update_profession(profession_id: int, profession: ProfessionCreate, db: Session = Depends(get_db)):
    db_profession = db.query(Profession).filter_by(id_profession=profession_id).first()
    if not db_profession:
        raise HTTPException(status_code=404, detail="Profesión no encontrada.")
    
    if db_profession.name != profession.name:
        existing = db.query(Profession).filter_by(name=profession.name).first()
        if existing:
            raise HTTPException(status_code=400, detail="Ya existe una profesión con ese nombre.")
    
    db_profession.name = profession.name
    db.commit()
    db.refresh(db_profession)
    return db_profession

@router.delete("/profession/{profession_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_profession(profession_id: int, db: Session = Depends(get_db)):
    db_profession = db.query(Profession).filter_by(id_profession=profession_id).first()
    if not db_profession:
        raise HTTPException(status_code=404, detail="Profesión no encontrada.")
    
    db.delete(db_profession)
    db.commit()
    return {"detail": "Profesión eliminada correctamente"}
