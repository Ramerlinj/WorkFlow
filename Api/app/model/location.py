from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.conexion import Base

class Location(Base):
    __tablename__ = 'LOCATIONS'

    id_location = Column('ID_LOCATION', Integer, primary_key=True, autoincrement=True)
    id_country = Column('ID_COUNTRY', Integer, ForeignKey('COUNTRY.ID_COUNTRY'), nullable=False)
    city = Column('CITY', String(50), nullable=False)

    country = relationship('Country', back_populates='locations')