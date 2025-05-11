from sqlalchemy import Column, Integer, String
from app.database.conexion import Base

class Skill(Base):
    __tablename__ = 'SKILLS'

    id_skill = Column('ID_SKILL', Integer, primary_key=True, autoincrement=True)
    name = Column('NAME', String(50), nullable=False, unique=True)

    users = relationship('UserSkill', back_populates='skill')