from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.conexion import SessionLocal
from app.models.job_application import JobApplication
from app.schemas.job_applications import JobApplicationCreate, JobApplicationResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/job-application", response_model=JobApplicationResponse, status_code=status.HTTP_201_CREATED)
def create_job_application(application: JobApplicationCreate, db: Session = Depends(get_db)):
    existing = db.query(JobApplication).filter_by(
        id_user=application.id_user,
        id_employment=application.id_employment
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Ya has aplicado a esta oferta.")

    db_application = JobApplication(**application.dict())
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application



# GET - Obtener todas las solicitudes
@router.get("/job-applications", response_model=List[JobApplicationResponse])
def get_all_job_applications(db: Session = Depends(get_db)):
    return db.query(JobApplication).all()

# GET - Obtener solicitudes por ID de usuario
@router.get("/job-applications/user/{user_id}", response_model=List[JobApplicationResponse])
def get_job_applications_by_user(user_id: int, db: Session = Depends(get_db)):
    applications = db.query(JobApplication).filter(JobApplication.id_user == user_id).all()

    if not applications:
        raise HTTPException(status_code=404, detail="El usuario no tiene solicitudes registradas")

    return applications


# PUT - Actualizar estado (solo status)
@router.put("/job-application/{application_id}", response_model=JobApplicationResponse)
def update_job_application_status(application_id: int, updated_data: JobApplicationCreate, db: Session = Depends(get_db)):
    application = db.query(JobApplication).filter(JobApplication.id_application == application_id).first()

    if not application:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")

    # Solo permitimos actualizar el estado
    application.status = updated_data.status

    db.commit()
    db.refresh(application)
    return application


# DELETE - Eliminar solicitud
@router.delete("/job-application/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job_application(application_id: int, db: Session = Depends(get_db)):
    application = db.query(JobApplication).filter(JobApplication.id_application == application_id).first()

    if not application:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")

    db.delete(application)
    db.commit()
    return {"detail": "Solicitud eliminada correctamente"}
