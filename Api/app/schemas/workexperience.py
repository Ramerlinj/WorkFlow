from pydantic import BaseModel, Field
from datetime import date
from typing import Optional

class WorkExperienceBase(BaseModel):
    id_user: int
    title: str = Field(..., max_length=100)
    company: str = Field(..., max_length=100)
    start_date: date
    end_date: Optional[date] = None
    description: Optional[str] = Field(None, max_length=255)

class WorkExperienceCreate(WorkExperienceBase):
    pass

class WorkExperienceRead(WorkExperienceBase):
    id_experience: int

    class Config:
        from_attributes = True