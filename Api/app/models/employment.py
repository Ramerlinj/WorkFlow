from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.conexion import Base

class Employment(Base):
    __tablename__ = 'EMPLOYMENTS'

    id_employment = Column('ID_EMPLOYMENT', Integer, primary_key=True, autoincrement=True)
    id_type_job = Column('ID_TYPE_JOB', Integer, ForeignKey('TYPE_JOBS.ID_TYPE_JOB'), nullable=False)
    title = Column('TITLE', String(100), nullable=False)
    description = Column('DESCRIPTION', String(1000), nullable=True)
    company = Column('COMPANY', String(100), nullable=False)
    salary = Column('SALARY', Numeric(19,4), nullable=True)
    publication_date = Column('PUBLICATION_DATE', DateTime, default=datetime.utcnow, nullable=False)
    status = Column('STATUS', String(20), nullable=False, default='Open')
    id_location = Column('ID_LOCATION', Integer, ForeignKey('LOCATIONS.ID_LOCATION'), nullable=True)

    type_job = relationship('TypeJob', back_populates='employments')
    location = relationship('Location')
    applications = relationship('JobApplication', back_populates='employment', cascade='all, delete-orphan')

