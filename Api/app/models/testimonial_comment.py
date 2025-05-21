
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, func
from sqlalchemy.orm import relationship
from app.database.conexion import Base


class TestimonialComment(Base):
    __tablename__ = 'TESTIMONIAL_COMMENTS'
    __table_args__ = {'extend_existing': True}

    id_comment = Column('ID_COMMENT', Integer, primary_key=True, autoincrement=True, index=True)
    id_testimonial = Column('ID_TESTIMONIAL', Integer, ForeignKey('TESTIMONIALS.ID_TESTIMONIAL', ondelete='CASCADE'), nullable=False, index=True)
    id_user = Column('ID_USER', Integer, ForeignKey('USERS.ID_USER'), nullable=False)
    comment = Column('COMMENT', String(500), nullable=False)
    created_at = Column('CREATED_AT', DateTime, server_default=func.now(), nullable=False)

    testimonial = relationship('Testimonial', back_populates='comments')
    user = relationship("User", back_populates="comments")