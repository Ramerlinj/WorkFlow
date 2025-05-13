from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.database.conexion import Base

class UserSkill(Base):
    __tablename__ = 'USER_SKILLS'

    id_user = Column('ID_USER', Integer, ForeignKey('USERS.ID_USER', ondelete='CASCADE'), primary_key=True)
    id_skill = Column('ID_SKILL', Integer, ForeignKey('SKILLS.ID_SKILL', ondelete='CASCADE'), primary_key=True)

    user = relationship('User', back_populates='skills')
    skill = relationship('Skill', back_populates='users')



    #!YA CREE LA DB EN AZURE SOLO FALTA CORREGIR ALGUNOS ERRORES Y HACER LOS DEMAS ENDPOINTS