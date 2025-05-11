from sqlalchemy import Column, Integer, String
from app.database.conexion import Base

class Country(Base):
    __tablename__ = 'COUNTRY'

    id_country = Column('ID_COUNTRY', Integer, primary_key=True, autoincrement=True)
    name = Column('NAME', String(50), nullable=True)

    locations = relationship('Location', back_populates='country', cascade='all, delete-orphan')
