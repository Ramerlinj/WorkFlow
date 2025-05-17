from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database.conexion import SessionLocal
from app.models.employment import Employment
from app.schemas.employments import EmploymentCreate, EmploymentResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/employment", response_model=EmploymentResponse, status_code=status.HTTP_201_CREATED)
def create_employment(employment: EmploymentCreate, db: Session = Depends(get_db)):
    db_employment = Employment(**employment.dict())
    db.add(db_employment)
    db.commit()
    db.refresh(db_employment)
    return db_employment

@router.get("/employments", response_model=List[EmploymentResponse])
def get_all_employments(db: Session = Depends(get_db)):
    return db.query(Employment).all()

@router.get("/employment/{employment_id}", response_model=EmploymentResponse)
def get_employment_by_id(employment_id: int, db: Session = Depends(get_db)):
    employment = db.query(Employment).filter(Employment.id_employment == employment_id).first()
    if not employment:
        raise HTTPException(status_code=404, detail="Employment no encontrado")
    return employment

@router.put("/employment/{employment_id}", response_model=EmploymentResponse)
def update_employment(employment_id: int, updated_data: EmploymentCreate, db: Session = Depends(get_db)):
    employment = db.query(Employment).filter(Employment.id_employment == employment_id).first()
    if not employment:
        raise HTTPException(status_code=404, detail="Employment no encontrado")
    
    for key, value in updated_data.dict().items():
        setattr(employment, key, value)

    db.commit()
    db.refresh(employment)
    return employment

@router.delete("/employment/{employment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employment(employment_id: int, db: Session = Depends(get_db)):
    employment = db.query(Employment).filter(Employment.id_employment == employment_id).first()
    if not employment:
        raise HTTPException(status_code=404, detail="Employment no encontrado")
    
    db.delete(employment)
    db.commit()
    return {"detail": "Employment deleted successfully. The data will be removed from the database after a while."}
