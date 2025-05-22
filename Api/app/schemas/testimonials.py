# app/schemas/testimonials.py
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List
from app.schemas.testimonial_comment import TestimonialCommentResponse
from app.schemas.users import UserResponse

class TestimonialBase(BaseModel):
    id_user_source: int
    title: str = Field(..., max_length=100)
    description: Optional[str] = Field(None, max_length=1000)
    rating: int = Field(..., ge=1, le=5)

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = Field(None, max_length=1000)
    rating: Optional[int] = Field(None, ge=1, le=5)
    likes: Optional[int] = Field(None, ge=0)

class TestimonialResponse(TestimonialBase):
    id_testimonial: int
    likes: int
    created_at: datetime
    user_source: UserResponse
    comments: List[TestimonialCommentResponse] = []

    class Config:
        from_attributes = True
