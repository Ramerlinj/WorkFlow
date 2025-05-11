from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.conexion import Base

class Link(Base):
    __tablename__ = 'LINKS'

    id_link = Column('ID_LINK', Integer, primary_key=True, autoincrement=True)
    id_user = Column('ID_USER', Integer, ForeignKey('USERS.ID_USER', ondelete='CASCADE'), nullable=False)
    id_link_type = Column('ID_LINK_TYPE', Integer, ForeignKey('LINK_TYPES.ID_LINK_TYPE'), nullable=False)
    url = Column('URL', String(255), nullable=False)

    user = relationship('User', back_populates='links')
    link_type = relationship('LinkType', back_populates='links')