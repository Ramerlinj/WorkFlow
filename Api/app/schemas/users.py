from pydantic import BaseModel, EmailStr
from datetime import date, datetime

class UserCreate(BaseModel):
    username: str
    first_name: str
    middle_name: str | None = None
    first_surname: str
    second_surname: str | None = None
    email: EmailStr
    password: str
    date_of_birth: date

class UserResponse(BaseModel):
    id_user: int
    username: str
    first_name: str
    middle_name: str | None
    first_surname: str
    second_surname: str | None
    email: EmailStr
    date_of_birth: date
    creation_date: datetime

    class Config:
        from_attributes = True

