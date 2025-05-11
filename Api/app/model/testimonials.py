from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, SmallInteger
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.conexion import Base

class Testimonial(Base):
    __tablename__ = 'TESTIMONIALS'

    id_testimonial = Column('ID_TESTIMONIAL', Integer, primary_key=True, autoincrement=True)
    id_user_source = Column('ID_USER_SOURCE', Integer, ForeignKey('USERS.ID_USER', ondelete='CASCADE'), nullable=False)
    id_user_target = Column('ID_USER_TARGET', Integer, ForeignKey('USERS.ID_USER', ondelete='NO ACTION'), nullable=False)
    rating = Column('RATING', SmallInteger, nullable=False)
    comment = Column('COMMENT', String(500), nullable=True)
    created_at = Column('CREATED_AT', DateTime, default=datetime.utcnow, nullable=False)

    source = relationship('User', foreign_keys=[id_user_source])
    target = relationship('User', foreign_keys=[id_user_target])
