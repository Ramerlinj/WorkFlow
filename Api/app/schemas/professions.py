from pydantic import BaseModel, Field

class ProfessionBase(BaseModel):
    name: str = Field(..., max_length=50)

class ProfessionCreate(ProfessionBase):
    pass

class ProfessionResponse(ProfessionBase):
    id_profession: int

    class Config:
        from_attributes = True