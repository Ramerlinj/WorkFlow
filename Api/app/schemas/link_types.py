from pydantic import BaseModel, Field

class LinkTypeBase(BaseModel):
    name: str = Field(..., max_length=50)

class LinkTypeCreate(LinkTypeBase):
    pass

class LinkTypeRead(LinkTypeBase):
    id_link_type: int

    class Config:
        from_attributes = True