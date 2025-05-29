from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.conexion import Base

class Employment(Base):
    __tablename__ = 'EMPLOYMENTS'

    id_employment = Column('ID_EMPLOYMENT', Integer, primary_key=True, autoincrement=True)
    id_type_job = Column('ID_TYPE_JOB', Integer, ForeignKey('TYPE_JOBS.ID_TYPE_JOB'), nullable=False)
    id_profession = Column('ID_PROFESSION', Integer, ForeignKey('PROFESSIONS.ID_PROFESSION'), nullable=False)
    id_user = Column('ID_USER', Integer, ForeignKey('USERS.ID_USER'), nullable=False)
    title = Column('TITLE', String(100), nullable=False)
    description = Column('DESCRIPTION', String(1000), nullable=True)
    company = Column('COMPANY', String(100), nullable=False)
    salary_min = Column('SALARY_MIN', Numeric(19,4), nullable=True)
    salary_max = Column('SALARY_MAX', Numeric(19,4), nullable=True)
    publication_date = Column('PUBLICATION_DATE', DateTime, default=datetime.utcnow, nullable=False)
    status = Column('STATUS', String(20), nullable=False, default='Open')
    id_location = Column('ID_LOCATION', Integer, ForeignKey('LOCATIONS.ID_LOCATION'), nullable=True)

    # Relaciones
    type_job = relationship('TypeJob', back_populates='employments')
    profession = relationship('Profession', back_populates='employments') 
    applications = relationship('JobApplication', back_populates='employment', cascade='all, delete-orphan')
    location = relationship('Location', back_populates='employments') 
    user = relationship('User', back_populates='employments') 
