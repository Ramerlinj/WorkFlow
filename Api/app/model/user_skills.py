from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, primary_key, ForeignKey

Base = declarative_base()

class UserSkill(Base):
    __tablename__ = "USER_SKILLS"

    ID_USER = Column(Integer, ForeignKey("USERS.ID_USER"), nullable=False, primary_key=True)
    ID_SKILL = Column(Integer, ForeignKey("SKILLS.ID_SKILL"), nullable=False, primary_key=True)

    # Relación con el usuario
    user = relationship("User", back_populates="skills")
    # Relación con la habilidad
    skill = relationship("Skill", back_populates="user_skills")