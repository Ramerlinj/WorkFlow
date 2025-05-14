from pydantic import BaseModel, Field, EmailStr
from datetime import date, datetime
from typing import Optional

class UserBase(BaseModel):
    id_profession: int
    username: str = Field(..., max_length=50)
    email: EmailStr
    first_name: str = Field(..., max_length=50)
    middle_name: Optional[str] = Field(None, max_length=50)
    first_surname: str = Field(..., max_length=50)
    second_surname: Optional[str] = Field(None, max_length=50)
    date_of_birth: date
    address: Optional[str] = Field(None, max_length=100)

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=128)

class UserResponse(UserBase):
    id_user: int
    creation_date: datetime

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    id_profession: Optional[int] = None
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    first_name: Optional[str] = None
    middle_name: Optional[str] = None
    first_surname: Optional[str] = None
    second_surname: Optional[str] = None
    date_of_birth: Optional[date] = None
    address: Optional[str] = None
