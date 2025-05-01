from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.conexion import Base


class Profile(Base):
    __tablename__ = 'PROFILE'

    id_profile = Column(Integer, primary_key=True, autoincrement=True)
    id_user = Column(Integer, ForeignKey('USERS.id_user', ondelete='CASCADE'), nullable=False, unique=True)
    about_me = Column(String(500), default='No se conoce una descripción...')
    avatar = Column(String, nullable=True)
    cv = Column(String, nullable=True)

    user = relationship('User', back_populates='profile')

