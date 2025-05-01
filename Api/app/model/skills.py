from sqlalchemy import Column, Integer, String
from app.database.conexion import Base
from sqlalchemy.orm import relationship

class Skill(Base):
    __tablename__ = 'SKILLS'

    id_skill = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(50), unique=True, nullable=False)

    users = relationship('UserSkill', back_populates='skill')