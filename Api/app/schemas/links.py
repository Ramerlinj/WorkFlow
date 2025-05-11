from pydantic import BaseModel, Field

class LinkBase(BaseModel):
    id_user: int
    id_link_type: int
    url: str = Field(..., max_length=255)

class LinkCreate(LinkBase):
    pass

class LinkRead(LinkBase):
    id_link: int

    class Config:
        from_attributes = True