from pydantic import BaseModel, Field
from datetime import datetime

class TestimonialCommentBase(BaseModel):
    id_user: int
    comment_text: str = Field(..., max_length=500)

class TestimonialCommentCreate(TestimonialCommentBase):
    pass

class TestimonialCommentResponse(TestimonialCommentBase):
    id_comment: int
    created_at: datetime

    class Config:
        from_attributes = True