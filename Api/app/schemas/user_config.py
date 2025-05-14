from pydantic import BaseModel, Field
from typing import Literal

class UserConfigBase(BaseModel):
    id_user: int
    public_profile: bool = True
    job_alert: bool = True
    language: Literal['Español', 'Ingles'] = 'Español'

class UserConfigCreate(UserConfigBase):
    pass

class UserConfigResponse(UserConfigBase):
    id_config: int

    class Config:
        from_attributes = True
        