from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class TestimonialBase(BaseModel):
    id_user_source: int
    id_user_target: int
    rating: int = Field(..., ge=1, le=5)
    comment: Optional[str] = Field(None, max_length=500)

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialRead(TestimonialBase):
    id_testimonial: int
    created_at: datetime

    class Config:
        from_attributes = True
