from sqlalchemy import Column, Integer, String, Date, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "USERS"
    
    ID_USER = Column(Integer, primary_key=True, index=True)
    USERNAME = Column(String(50), unique=True, nullable=False)
    FIRST_NAME = Column(String(50), nullable=False)
    MIDDLE_NAME = Column(String(50))
    FIRST_SURNAME = Column(String(50), nullable=False)
    SECOND_SURNAME = Column(String(50))
    EMAIL = Column(String(100), nullable=False)
    HASH_PASSWORD = Column(String(100), nullable=False)
    DATE_OF_BIRTH = Column(Date, nullable=False)
    CREATION_DATE = Column(DateTime, default="CURRENT_TIMESTAMP", nullable=False)

    # Relación con el perfil
    profile = relationship("Profile", back_populates="user", uselist=False)

    # Relación con las habilidades a través de UserSkill
    skills = relationship("UserSkill", back_populates="user")

    # Relación con la  tabla  enlaces
    links = relationship("Link", back_populates="user")

    # Relación con la tabla experiencia laboral
    work_experience = relationship("WorkExperience", back_populates="user")
