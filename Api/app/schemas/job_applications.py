from pydantic import BaseModel, Field
from datetime import datetime
from typing import Literal, Optional

class JobApplicationBase(BaseModel):
    id_user: int
    id_employment: int
    cover_letter: Optional[str] = None
    application_date: Optional[datetime] = None
    status: Literal['Pending', 'Accepted', 'Rejected'] = 'Pending' 

class JobApplicationCreate(JobApplicationBase):
    pass

class JobApplicationResponse(JobApplicationBase):
    id_application: int
    cover_letter: str 


    class Config:
        from_attributes = True