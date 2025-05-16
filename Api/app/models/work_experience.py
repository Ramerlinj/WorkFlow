from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database.conexion import Base

class WorkExperience(Base):
    __tablename__ = 'WORK_EXPERIENCE'

    id_experience = Column('ID_EXPERIENCE', Integer, primary_key=True, autoincrement=True)
    id_user = Column('ID_USER', Integer, ForeignKey('USERS.ID_USER', ondelete='CASCADE'), nullable=False)
    title = Column('TITLE', String(100), nullable=False)
    company = Column('COMPANY', String(100), nullable=False)
    start_date = Column('START_DATE', Date, nullable=False)
    end_date = Column('END_DATE', Date, nullable=True)
    description = Column('DESCRIPTION', String(255), nullable=True)

    user = relationship('User', back_populates='work_experience')
