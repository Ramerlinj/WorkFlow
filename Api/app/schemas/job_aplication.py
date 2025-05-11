from pydantic import BaseModel, Field
from datetime import datetime
from typing import Literal, Optional

class JobApplicationBase(BaseModel):
    id_user: int
    id_employment: int
    application_date: Optional[datetime] = None
    status: Literal['Pending', 'Accepted', 'Rejected'] = 'Pending'

class JobApplicationCreate(JobApplicationBase):
    pass

class JobApplicationRead(JobApplicationBase):
    id_application: int

    class Config:
        from_attributes = True