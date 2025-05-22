from pydantic import BaseModel, Field
from datetime import datetime
from decimal import Decimal
from typing import Optional
from typing import Literal
from app.schemas.type_jobs import TypeJobBase
from app.schemas.professions import ProfessionBase
from app.schemas.locations import LocationBase

class EmploymentBase(BaseModel):
    id_type_job: int
    id_profession: int 
    title: str = Field(..., max_length=100)
    description: Optional[str] = Field(None, max_length=1000)
    company: str = Field(..., max_length=100)
    salary_min: Optional[Decimal] = None
    salary_max: Optional[Decimal] = None
    publication_date: Optional[datetime] = None
    status: Literal['Open', 'Closed'] = 'Open'
    id_location: Optional[int] = None

class EmploymentCreate(EmploymentBase):
    pass

class EmploymentResponse(EmploymentBase):
    id_employment: int
    title: str
    description: Optional[str]
    company: str
    salary_min: Optional[Decimal]
    salary_max: Optional[Decimal]
    publication_date: Optional[datetime]
    status: Literal['Open', 'Closed']
    
    type_job: TypeJobBase
    profession: ProfessionBase
    location: Optional[LocationBase]

    class Config:
        from_attributes = True
