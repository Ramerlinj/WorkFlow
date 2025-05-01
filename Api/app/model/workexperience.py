from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.database.conexion import Base

class WorkExperience(Base):
    __tablename__ = 'WORKEXPERIENCE'

    id_experience = Column(Integer, primary_key=True, autoincrement=True)
    id_user = Column(Integer, ForeignKey('USERS.id_user', ondelete='CASCADE'), nullable=False)
    title = Column(String(100), nullable=False)
    company = Column(String(100), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)
    description = Column(String(255), nullable=True)

    user = relationship('User', back_populates='work_experience')
