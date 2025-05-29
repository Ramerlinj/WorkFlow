# app/routers/testimonials.py

from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session, joinedload
from app.database.conexion import SessionLocal
from app.models.testimonials import Testimonial
from app.models.testimonial_comment import TestimonialComment
from app.models.user import User
from app.auth import get_current_user
from app.schemas.testimonials import (
    TestimonialCreate,
    TestimonialUpdate,
    TestimonialResponse,
)
from app.schemas.testimonial_comment import (
    TestimonialCommentCreate,
    TestimonialCommentResponse,
)

router = APIRouter(
    prefix="/testimonials",
    tags=["testimonials"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Listar todos los testimonios
@router.get("/", response_model=list[TestimonialResponse])
def get_testimonials(
    db: Session = Depends(get_db)
):
    testimonials = (
        db.query(Testimonial)
          .options(
            joinedload(Testimonial.user_source),
            joinedload(Testimonial.comments).joinedload(TestimonialComment.user)
          )
          .all()
    )
    return testimonials  # devuelve [] si no hay


# Obtener detalle de un testimonio
@router.get("/{testimonial_id}", response_model=TestimonialResponse)
def get_testimonial(
    testimonial_id: int,
    db: Session = Depends(get_db)
):
    testimonial = (
        db.query(Testimonial)
          .options(
            joinedload(Testimonial.user_source),
            joinedload(Testimonial.comments).joinedload(TestimonialComment.user),
          )
          .filter(Testimonial.id_testimonial == testimonial_id)
          .first()
    )
    if not testimonial:
        raise HTTPException(404, "Testimonio no encontrado")
    return testimonial


# Crear un testimonio
@router.post("/", response_model=TestimonialResponse, status_code=status.HTTP_201_CREATED)
def create_testimonial(
    data: TestimonialCreate,
    db: Session = Depends(get_db)
):
    # Validar usuarios
    if not db.query(User).filter(User.id_user == data.id_user_source).first():
        raise HTTPException(404, "Usuario origen no encontrado")

    new_testimonial = Testimonial(**data.dict(exclude_unset=True))
    db.add(new_testimonial)
    db.commit()
    db.refresh(new_testimonial)
    # Recargar relaciones
    db.refresh(new_testimonial.user_source)
    return new_testimonial


# Actualizar testimonio
@router.put("/{testimonial_id}", response_model=TestimonialResponse)
def update_testimonial(
    testimonial_id: int,
    data: TestimonialUpdate,
    db: Session = Depends(get_db)
):
    t = db.query(Testimonial).filter(Testimonial.id_testimonial == testimonial_id).first()
    if not t:
        raise HTTPException(404, "Testimonio no encontrado")

    for field, value in data.dict(exclude_unset=True).items():
        setattr(t, field, value)

    db.commit()
    db.refresh(t)
    # Recargar relaciones
    db.refresh(t.user_source)
    return t


# Eliminar testimonio
@router.delete("/{testimonial_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_testimonial(
    testimonial_id: int,
    db: Session = Depends(get_db)
):
    t = db.query(Testimonial).filter(Testimonial.id_testimonial == testimonial_id).first()
    if not t:
        raise HTTPException(404, "Testimonio no encontrado")
    db.delete(t)
    db.commit()
    return


@router.post("/comment", response_model=TestimonialCommentResponse, status_code=status.HTTP_201_CREATED)
def create_comment(
    data: TestimonialCommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # <-- usuario autenticado
):
    if not db.query(Testimonial).filter(Testimonial.id_testimonial == data.id_testimonial).first():
        raise HTTPException(404, "Testimonio no encontrado")

    # Ya no verificamos id_user del body, usamos current_user
    if not current_user:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "No autenticado")

    new_cm = TestimonialComment(
        comment=data.comment,
        id_testimonial=data.id_testimonial,
        id_user=current_user.id_user  # <-- Aquí el id del usuario autenticado
    )
    db.add(new_cm)
    db.commit()
    db.refresh(new_cm)

    comment_with_user = (
        db.query(TestimonialComment)
        .options(joinedload(TestimonialComment.user))
        .filter(TestimonialComment.id_comment == new_cm.id_comment)
        .first()
    )

    return comment_with_user



# Actualizar comentario
@router.put("/comment/{comment_id}", response_model=TestimonialCommentResponse)
def update_comment(
    comment_id: int,
    data: TestimonialCommentCreate,
    db: Session = Depends(get_db)
):
    cm = db.query(TestimonialComment).filter(TestimonialComment.id_comment == comment_id).first()
    if not cm:
        raise HTTPException(404, "Comentario no encontrado")
    cm.comment = data.comment
    cm.id_user = data.id_user
    db.commit()
    db.refresh(cm)
    db.refresh(cm.user)
    return cm


# Eliminar comentario
@router.delete("/comment/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_comment(
    comment_id: int,
    db: Session = Depends(get_db)
):
    cm = db.query(TestimonialComment).filter(TestimonialComment.id_comment == comment_id).first()
    if not cm:
        raise HTTPException(404, "Comentario no encontrado")
    db.delete(cm)
    db.commit()
    return
