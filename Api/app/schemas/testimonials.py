from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List
from app.schemas.testimonial_comment import TestimonialCommentResponse

class TestimonialBase(BaseModel):
    id_user_source: int
    id_user_target: int
    title: str = Field(..., max_length=100)
    description: Optional[str] = Field(None, max_length=1000)
    rating: int = Field(..., ge=1, le=5)

class TestimonialCreate(BaseModel):
    title: str
    description: str
    rating: int
    id_user_source: int
    id_user_target: int
    created_at: Optional[datetime] = None

class TestimonialUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = Field(None, max_length=1000)
    rating: Optional[int] = Field(None, ge=1, le=5)
    likes: Optional[int] = Field(None, ge=0)

class TestimonialResponse(TestimonialBase):
    id_testimonial: int
    likes: int
    created_at: datetime
    comments: List[TestimonialCommentResponse] = []

    class Config:
        from_attributes = True