from sqlalchemy import Column, Integer, String
from app.database.conexion import Base
from sqlalchemy.orm import relationship

class TypeJob(Base):
    __tablename__ = 'TYPE_JOBS'

    id_type_job = Column('ID_TYPE_JOB', Integer, primary_key=True, autoincrement=True)
    name = Column('NAME', String(50), nullable=False, unique=True)

    employments = relationship('Employment', back_populates='type_job')