from sqlalchemy import Column, Integer, String
from app.database.conexion import Base
from sqlalchemy.orm import relationship

class LinkType(Base):
    __tablename__ = 'LINK_TYPES'

    id_link_type = Column('ID_LINK_TYPE', Integer, primary_key=True, autoincrement=True)
    name = Column('NAME', String(50), nullable=False, unique=True)

    links = relationship('Link', back_populates='link_type')