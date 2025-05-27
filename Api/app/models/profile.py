from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.conexion import Base

class Profile(Base):
    __tablename__ = 'PROFILES'

    id_profile = Column('ID_PROFILE', Integer, primary_key=True, autoincrement=True)
    id_user = Column('ID_USER', Integer, ForeignKey('USERS.ID_USER', ondelete='CASCADE'), nullable=False, unique=True)
    about_me = Column('ABOUT_ME', String(500), nullable=False, default='No tiene descripción...')
    avatar_url = Column('AVATAR_URL', String(255), nullable=True)
    cv_url = Column('CV_URL', String(255), nullable=True)
    banner_color = Column('BANNER_COLOR', String(50), nullable=False)

    user = relationship('User', back_populates='profile')