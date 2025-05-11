
from pydantic import BaseModel, Field

class CountryBase(BaseModel):
    name: str = Field(..., max_length=50)

class CountryCreate(CountryBase):
    pass

class CountryRead(CountryBase):
    id_country: int

    class Config:
        from_attributes = Tru