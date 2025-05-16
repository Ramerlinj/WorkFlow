from pydantic import BaseModel, Field

class SkillBase(BaseModel):
    name: str = Field(..., max_length=50)

class SkillCreate(SkillBase):
    pass

class SkillResponse(SkillBase):
    id_skill: int

    class Config:
        from_attributes = True