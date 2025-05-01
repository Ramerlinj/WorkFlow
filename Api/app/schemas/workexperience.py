from pydantic import BaseModel
from datetime import date

class WorkExperienceCreate(BaseModel):
    id_user: int
    title: str
    company: str
    start_date: date
    end_date: date | None = None
    description: str | None = None

class WorkExperienceResponse(WorkExperienceCreate):
    id_experience: int

    class Config:
        from_attributes = True

