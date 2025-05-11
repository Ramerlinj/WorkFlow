from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.conexion import Base

# models/user.py
from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.conexion import Base

class User(Base):
    __tablename__ = 'USERS'

    id_user = Column('ID_USER', Integer, primary_key=True, autoincrement=True)
    id_profession = Column('ID_PROFESSION', Integer, ForeignKey('PROFESSIONS.ID_PROFESSION'), nullable=False)
    username = Column('USERNAME', String(50), nullable=False, unique=True)
    email = Column('EMAIL', String(100), nullable=False, unique=True)
    hash_password = Column('HASH_PASSWORD', String(255), nullable=False)
    first_name = Column('FIRST_NAME', String(50), nullable=False)
    middle_name = Column('MIDDLE_NAME', String(50), nullable=True)
    first_surname = Column('FIRST_SURNAME', String(50), nullable=False)
    second_surname = Column('SECOND_SURNAME', String(50), nullable=True)
    date_of_birth = Column('DATE_OF_BIRTH', Date, nullable=False)
    creation_date = Column('CREATION_DATE', DateTime, default=datetime.utcnow, nullable=False)
    address = Column('ADDRESS', String(100), nullable=True)

    profession = relationship('Profession', back_populates='users')
    profile = relationship('Profile', back_populates='user', uselist=False, cascade='all, delete-orphan')
    skills = relationship('UserSkill', back_populates='user', cascade='all, delete-orphan')
    links = relationship('Link', back_populates='user', cascade='all, delete-orphan')
    work_experience = relationship('WorkExperience', back_populates='user', cascade='all, delete-orphan')
    user_config = relationship('UserConfig', back_populates='user', uselist=False, cascade='all, delete-orphan')
    notification_settings = relationship('NotificationSettings', back_populates='user', uselist=False, cascade='all, delete-orphan')
