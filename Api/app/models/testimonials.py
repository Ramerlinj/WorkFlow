# app/models/testimonials.py
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, SmallInteger
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.conexion import Base

class Testimonial(Base):
    __tablename__ = 'TESTIMONIALS'

    id_testimonial = Column('ID_TESTIMONIAL', Integer, primary_key=True, autoincrement=True)
    id_user_source = Column('ID_USER_SOURCE', Integer, ForeignKey('USERS.ID_USER', ondelete='CASCADE'), nullable=False)
    id_user_target = Column('ID_USER_TARGET', Integer, ForeignKey('USERS.ID_USER'), nullable=False)
    title = Column('TITLE', String(100), nullable=False)
    description = Column('DESCRIPTION', String(1000))
    rating = Column('RATING', SmallInteger, nullable=False)
    likes = Column('LIKES', Integer, default=0)
    created_at = Column('CREATED_AT', DateTime, default=datetime.utcnow)

    # Relaciones con User
    source = relationship("User", foreign_keys=[id_user_source], back_populates="testimonials_given")
    target = relationship("User", foreign_keys=[id_user_target], back_populates="testimonials_received")

