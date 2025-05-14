from pydantic import BaseModel, Field
from typing import Optional

class ProfileBase(BaseModel):
    about_me: Optional[str] = Field('No tiene descripción...', max_length=500)
    avatar_url: Optional[str] = Field(None, max_length=255)
    cv_url: Optional[str] = Field(None, max_length=255)

class ProfileCreate(ProfileBase):
    id_user: int

class ProfileResponse(ProfileBase):
    id_profile: int
    id_user: int

    class Config:
        from_attributes = True