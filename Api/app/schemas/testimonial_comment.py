# app/schemas/testimonial_comment.py

from pydantic import BaseModel, Field
from datetime import datetime
from app.schemas.users import UserResponse

# Este solo se usa para respuesta
class TestimonialCommentBase(BaseModel):
    id_user: int
    id_testimonial: int
    comment: str = Field(..., max_length=500)

# Solo recibe los datos del frontend (sin id_user)
class TestimonialCommentCreate(BaseModel):
    id_testimonial: int
    comment: str = Field(..., max_length=500)

class TestimonialCommentUpdate(BaseModel):
    comment: str = Field(..., max_length=500)

class TestimonialCommentResponse(TestimonialCommentBase):
    id_comment: int
    created_at: datetime
    user: UserResponse

    class Config:
        from_attributes = True
