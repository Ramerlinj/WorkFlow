from pydantic import BaseModel, HttpUrl

class LinkCreate(BaseModel):
    id_user: int
    name: str  # Validar en lógica si está entre Github, LinkedIn, Portafolio
    url: HttpUrl

class LinkResponse(LinkCreate):
    id_links: int

    class Config:
        orm_mode = True
