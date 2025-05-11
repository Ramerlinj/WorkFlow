from pydantic import BaseModel, Field

class TypeJobBase(BaseModel):
    name: str = Field(..., max_length=50)

class TypeJobCreate(TypeJobBase):
    pass

class TypeJobRead(TypeJobBase):
    id_type_job: int

    class Config:
        from_attributes = True