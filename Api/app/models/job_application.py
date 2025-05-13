from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.conexion import Base

class JobApplication(Base):
    __tablename__ = 'JOB_APPLICATIONS'

    id_application = Column('ID_APPLICATION', Integer, primary_key=True, autoincrement=True)
    id_user = Column('ID_USER', Integer, ForeignKey('USERS.ID_USER', ondelete='CASCADE'), nullable=False)
    id_employment = Column('ID_EMPLOYMENT', Integer, ForeignKey('EMPLOYMENTS.ID_EMPLOYMENT', ondelete='CASCADE'), nullable=False)
    application_date = Column('APPLICATION_DATE', DateTime, default=datetime.utcnow, nullable=False)
    status = Column('STATUS', String(20), nullable=False, default='Pending')

    user = relationship('User', back_populates='applications')
    employment = relationship('Employment', back_populates='applications')