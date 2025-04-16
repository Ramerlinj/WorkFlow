from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class WorkExperience(Base):
    __tablename__ = "WORK_EXPERIENCE"

    ID_WORK_EXPERIENCE = Column(Integer, primary_key=True, index=True)
    ID_USER = Column(Integer, ForeignKey("USERS.ID_USER"), nullable=true)
    TITLE = Column(String(100), nullable=False)
    COMPANY = Column(String(100), nullable=False)
    START_DATE = Column(Date, nullable=False)
    END_DATE = Column(Date, nullable=True)
    DESCRIPTION = Column(String(255), nullable=False)

    