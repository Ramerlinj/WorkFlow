from pydantic import BaseModel

class UserSkillBase(BaseModel):
    id_user: int
    id_skill: int

class UserSkillCreate(UserSkillBase):
    pass

class UserSkillRead(UserSkillBase):
    class Config:
        from_attributes = True