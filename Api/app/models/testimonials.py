# app/models/testimonials.py
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, SmallInteger, func
from sqlalchemy.orm import relationship
from app.database.conexion import Base


class Testimonial(Base):
    __tablename__ = 'TESTIMONIALS'

    id_testimonial = Column('ID_TESTIMONIAL', Integer, primary_key=True, autoincrement=True)
    id_user_source = Column('ID_USER_SOURCE', Integer, ForeignKey('USERS.ID_USER', ondelete='CASCADE'), nullable=False)
    title = Column('TITLE', String(100), nullable=False)
    description = Column('DESCRIPTION', String(1000))
    rating = Column('RATING', SmallInteger, nullable=False)
    likes = Column('LIKES', Integer, default=0)
    created_at = Column('CREATED_AT', DateTime, server_default=func.now())

    user_source = relationship(
        "User",
        foreign_keys=[id_user_source],
        back_populates="testimonials_given"
    )
    comments = relationship(
        'TestimonialComment',
        back_populates='testimonial',
        cascade='all, delete-orphan'
    )
 