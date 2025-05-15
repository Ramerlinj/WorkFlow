from pydantic import BaseModel, Field
from datetime import datetime
from decimal import Decimal
from typing import Optional
from enum import Literal

class EmploymentBase(BaseModel):
    id_type_job: int
    id_profession: int 
    title: str = Field(..., max_length=100)
    description: Optional[str] = Field(None, max_length=1000)
    company: str = Field(..., max_length=100)
    salary: Optional[Decimal] = None
    publication_date: Optional[datetime] = None
    status: Literal['Open', 'Closed'] = 'Open'
    id_location: Optional[int] = None

class EmploymentCreate(EmploymentBase):
    pass

class EmploymentResponse(EmploymentBase):
    id_employment: int

    class Config:
        from_attributes = True