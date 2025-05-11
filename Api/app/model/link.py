from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.conexion import Base

class Link(Base):
    __tablename__ = 'LINK'

    id_links = Column(Integer, primary_key=True, autoincrement=True)
    id_user = Column(Integer, ForeignKey('USERS.id_user', ondelete='CASCADE'), nullable=False)
    name = Column(String(20), nullable=False)
    url = Column(String(255), nullable=False)

    user = relationship('User', back_populates='links')
