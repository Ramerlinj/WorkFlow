from pydantic import BaseModel

class UserSkillCreate(BaseModel):
    id_user: int
    id_skill: int

class UserSkillResponse(UserSkillCreate):
    class Config:
        orm_mode = True
