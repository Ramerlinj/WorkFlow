from pydantic import BaseModel, Field

class LocationBase(BaseModel):
    id_country: int
    city: str = Field(..., max_length=50)

class LocationCreate(LocationBase):
    pass

class LocationResponse(LocationBase):
    id_location: int

    class Config:
        from_attributes = True