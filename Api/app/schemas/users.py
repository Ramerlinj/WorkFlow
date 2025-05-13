from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional

class UserBase(BaseModel):
    id_profession: int
    username: str = Field(..., max_length=50)
    email: str = Field(..., max_length=100)
    first_name: str = Field(..., max_length=50)
    middle_name: Optional[str] = Field(None, max_length=50)
    first_surname: str = Field(..., max_length=50)
    second_surname: Optional[str] = Field(None, max_length=50)
    date_of_birth: date
    address: Optional[str] = Field(None, max_length=100)

class UserCreate(UserBase):
    hash_password: str = Field(..., max_length=255)

class UserResponse(UserBase):
    id_user: int
    creation_date: datetime

    class Config:
        from_attributes = True