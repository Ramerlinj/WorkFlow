from sqlalchemy import Column, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database.conexion import Base

class NotificationSettings(Base):
    __tablename__ = 'NOTIFICATION_SETTINGS'

    id_notif = Column('ID_NOTIF', Integer, primary_key=True, autoincrement=True)
    id_user = Column('ID_USER', Integer, ForeignKey('USERS.ID_USER', ondelete='CASCADE'), nullable=False, unique=True)
    by_email = Column('BY_EMAIL', Boolean, nullable=False, default=True)
    by_sms = Column('BY_SMS', Boolean, nullable=False, default=False)
    push_notifications = Column('PUSH_NOTIFICATIONS', Boolean, nullable=False, default=False)

    user = relationship('User', back_populates='notification_settings')
