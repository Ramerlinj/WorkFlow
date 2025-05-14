from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.conexion import Base

class TestimonialComment(Base):
    __tablename__ = 'TESTIMONIAL_COMMENTS'
    __table_args__ = {'extend_existing': True}

    id_comment = Column('ID_COMMENT', Integer, primary_key=True, autoincrement=True)
    id_testimonial = Column('ID_TESTIMONIAL', Integer, ForeignKey('TESTIMONIALS.ID_TESTIMONIAL', ondelete='CASCADE'), nullable=False)
    id_user = Column('ID_USER', Integer, ForeignKey('USERS.ID_USER'), nullable=False)
    comment = Column('COMMENT', String(500), nullable=False)
    created_at = Column('CREATED_AT', DateTime, default=datetime.utcnow, nullable=False)

    testimonial = relationship('Testimonial', back_populates='comments')
    user = relationship('User')




    