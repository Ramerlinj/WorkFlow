from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.conexion import SessionLocal
from app.models.link import Link
from app.schemas.links import LinkCreate, LinkResponse
from app.models.link_type import LinkType
from app.schemas.link_types import LinkTypeResponse


router = APIRouter()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/link_types", response_model=List[LinkTypeResponse])
def get_link_types(db: Session = Depends(get_db)):
    link_types = db.query(LinkType).all()
    return link_types

@router.post("/link", response_model=LinkResponse, status_code=status.HTTP_201_CREATED)
def create_link(link: LinkCreate, db: Session = Depends(get_db)):
    new_link = Link(**link.dict())
    db.add(new_link)
    db.commit()
    db.refresh(new_link)
    return new_link

@router.get("/link/user/{user_id}", response_model=List[LinkResponse])
def get_links_by_user(user_id: int, db: Session = Depends(get_db)):
    links = db.query(Link).filter(Link.id_user == user_id).all()
    return links

@router.put("/link/{link_id}", response_model=LinkResponse)
def update_link(link_id: int, updated_link: LinkCreate, db: Session = Depends(get_db)):
    db_link = db.query(Link).filter(Link.id_link == link_id).first()
    if not db_link:
        raise HTTPException(status_code=404, detail="Link no encontrado")

    for key, value in updated_link.dict().items():
        setattr(db_link, key, value)

    db.commit()
    db.refresh(db_link)
    return db_link


@router.delete("/link/{link_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_link(link_id: int, db: Session = Depends(get_db)):
    db_link = db.query(Link).filter(Link.id_link == link_id).first()
    if not db_link:
        raise HTTPException(status_code=404, detail="Link no encontrado")
    
    db.delete(db_link)
    db.commit()
    return {"detail": "Link eliminado correctamente"}
