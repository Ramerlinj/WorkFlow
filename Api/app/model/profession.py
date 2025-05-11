from sqlalchemy import Column, Integer, String
from app.database.conexion import Base

class Profession(Base):
    __tablename__ = 'PROFESSIONS'

    id_profession = Column('ID_PROFESSION', Integer, primary_key=True, autoincrement=True)
    name = Column('NAME', String(50), nullable=False, unique=True)

    users = relationship('User', back_populates='profession')