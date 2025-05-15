
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from app.database.conexion import SessionLocal
from app.models.testimonials import Testimonial
from app.schemas.testimonials import TestimonialCreate, TestimonialUpdate, TestimonialResponse, TestimonialCommentResponse
from app.models.user import User
from app.schemas.testimonial_comment import TestimonialCommentCreate, TestimonialCommentResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/user/{id_user_source}/testimonials", response_model=list[TestimonialResponse])
def get_testimonials(id_user_source: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id_user == id_user_source).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    testimonials = db.query(Testimonial).filter(Testimonial.id_user_source == id_user_source).all()

    return testimonials
    
@router.get("/testimonials/{testimonial_id}", response_model=TestimonialResponse)
def get_testimonial(testimonial_id: int, db: Session = Depends(get_db)):
    testimonial = db.query(Testimonial).filter(Testimonial.id_testimonial == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonio no encontrado")
    return testimonial

@router.get("/comment/{comment_id}", response_model=TestimonialCommentResponse)
def get_comment(comment_id: int, db: Session = Depends(get_db)):
    comment = db.query(TestimonialComment).filter(TestimonialComment.id_comment == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comentario no encontrado.")
    return TestimonialCommentResponse(
        id_comment=comment.id_comment,
        id_user=comment.id_user,
        comment_text=comment.comment,
        created_at=comment.created_at
    )


@router.post("/testimonials", response_model=TestimonialResponse)
def create_testimonial(data: TestimonialCreate, db: Session = Depends(get_db)):

    # Usamos el id_user_source enviado en el cuerpo del request
    id_user_source = data.id_user_source  # Este ID proviene directamente del frontend

    # Creamos el testimonio
    new_testimonial = Testimonial(
        id_user_source=id_user_source,
        id_user_target=data.id_user_target,
        title=data.title,
        description=data.description,
        rating=data.rating,
    )

    # Guardamos el nuevo testimonio en la base de datos
    db.add(new_testimonial)
    db.commit()
    db.refresh(new_testimonial)

    return new_testimonial

@router.put("/testimonials/{testimonial_id}", response_model=TestimonialResponse)
def update_testimonial(testimonial_id: int, data: TestimonialUpdate, db: Session = Depends(get_db)):
    db_testimonial = db.query(Testimonial).filter(Testimonial.id_testimonial == testimonial_id).first()
    if not db_testimonial:
        raise HTTPException(status_code=404, detail="Testimonio no encontrado")

    if data.title is not None:
        db_testimonial.title = data.title
    if data.description is not None:
        db_testimonial.description = data.description
    if data.rating is not None:
        db_testimonial.rating = data.rating
    if data.likes is not None:
        db_testimonial.likes = data.likes

    db.commit()
    db.refresh(db_testimonial)
    return db_testimonial    

# Eliminar un testimonio
@router.delete("/testimonials/{id_testimonial}", status_code=status.HTTP_204_NO_CONTENT)
def delete_testimonial(id_testimonial: int, db: Session = Depends(get_db)):
    test = db.query(Testimonial).filter(Testimonial.id_testimonial == id_testimonial).first()
    if not test:
        raise HTTPException(status_code=404, detail="Testimonio no encontrado")

    db.delete(test)
    db.commit()

    return

@router.put("/comment/{comment_id}", response_model=TestimonialCommentResponse)
def update_comment(comment_id: int, updated_data: TestimonialCommentCreate, db: Session = Depends(get_db)):
    comment = db.query(TestimonialComment).filter(TestimonialComment.id_comment == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comentario no encontrado.")

    comment.comment = updated_data.comment_text
    comment.id_user = updated_data.id_user  # si permites que se actualice el usuario
    db.commit()
    db.refresh(comment)
    return TestimonialCommentResponse(
        id_comment=comment.id_comment,
        id_user=comment.id_user,
        comment_text=comment.comment,
        created_at=comment.created_at
    )


@router.delete("/comment/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    comment = db.query(TestimonialComment).filter(TestimonialComment.id_comment == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comentario no encontrado.")
    db.delete(comment)
    db.commit()
    return
