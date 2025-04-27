from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.database.conexion import Base

class UserSkill(Base):
    __tablename__ = 'USER_SKILLS'

    id_user = Column(Integer, ForeignKey('USERS.id_user', ondelete='CASCADE'), primary_key=True)
    id_skill = Column(Integer, ForeignKey('SKILLS.id_skill', ondelete='CASCADE'), primary_key=True)

    user = relationship('User', back_populates='skills')
    skill = relationship('Skill', back_populates='users')
