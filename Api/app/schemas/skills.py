from pydantic import BaseModel

class SkillCreate(BaseModel):
    nombre: str

class SkillResponse(SkillCreate):
    id_skill: int

    class Config:
        orm_mode = True
