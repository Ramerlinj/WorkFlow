from sqlalchemy import Column, Integer, Boolean, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.conexion import Base

class UserConfig(Base):
    __tablename__ = 'USER_CONFIG'

    id_config = Column('ID_CONFIG', Integer, primary_key=True, autoincrement=True)
    id_user = Column('ID_USER', Integer, ForeignKey('USERS.ID_USER', ondelete='CASCADE'), nullable=False, unique=True)
    public_profile = Column('PUBLIC_PROFILE', Boolean, nullable=False, default=True)
    job_alert = Column('JOB_ALERT', Boolean, nullable=False, default=True)
    language = Column('LANGUAGE', String(10), nullable=False, default='Español')

    user = relationship('User', back_populates='user_config')