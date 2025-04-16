from pydantic import BaseModel

class ProfileCreate(BaseModel):
    id_user: int
    about_me: str = "No se conoce una descripción..."
    avatar: str | None = None
    cv: str | None = None

class ProfileResponse(ProfileCreate):
    id_profile: int

    class Config:
        orm_mode = True
