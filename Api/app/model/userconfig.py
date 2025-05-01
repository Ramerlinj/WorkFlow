from sqlalchemy import Column, Integer, Boolean, String, ForeignKey
from app.database.conexion import Base
from sqlalchemy.orm import relationship

class UserConfig(Base):
    __tablename__ = 'USERCONFIG'

    id_config = Column(Integer, primary_key=True, autoincrement=True)
    id_user = Column(Integer, ForeignKey('USERS.id_user', ondelete='CASCADE'), nullable=False)
    public_profile = Column(Boolean, default=True)
    notification_by_mail = Column(Boolean, default=True)
    job_alert = Column(Boolean, default=True)
    language = Column(String(10), default='Español')

    user = relationship('User', back_populates='user_config')
