from sqlalchemy import Column, Integer, String, Date, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.conexion import Base

class User(Base):
    __tablename__ = 'USERS'

    id_user = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), nullable=False, unique=True)
    first_name = Column(String(50), nullable=False)
    middle_name = Column(String(50), nullable=True)
    first_surname = Column(String(50), nullable=False)
    second_surname = Column(String(50), nullable=True)
    email = Column(String(100), nullable=False)
    hash_password = Column(String(100), nullable=False)
    date_of_birth = Column(Date, nullable=False)
    creation_date = Column(DateTime, default=datetime.utcnow, nullable=False)

    profile = relationship('Profile', back_populates='user', uselist=False, cascade='all, delete-orphan')
    skills = relationship('UserSkill', back_populates='user', cascade='all, delete-orphan')
    links = relationship('Link', back_populates='user', cascade='all, delete-orphan')
    work_experience = relationship('WorkExperience', back_populates='user', cascade='all, delete-orphan')
    user_config = relationship('UserConfig', back_populates='user', uselist=False, cascade='all, delete-orphan')
