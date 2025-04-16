from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, primary_key, relationship


Base = declarative_base()

class Profile(Base):
    __tablename__ = "PROFILES"

    ID_PROFILE = Column(Integer, primary_key=True, index=True)
    PROFILE_NAME = Column(String(50), unique=True, nullable=False)
    ABOUT_ME = Column(String(255), nullable=False, DEFAULT="No se conoce una descripción...")
    AVATAR = Column(String, nullable=False)
    CV = Column(String, nullable=False)

    #? Relación con el usuario
    user = relationship("User", back_populates="profile")
