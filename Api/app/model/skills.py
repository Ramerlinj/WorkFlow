from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String

Base = declarative_base()

class Skill(Base):
    __tablename__ = "SKILLS"

    ID_SKILL = Column(Integer, primary_key=True, index=True)
    SKILL_NAME = Column(String(50), unique=True, nullable=False)


    