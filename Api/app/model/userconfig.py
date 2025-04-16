from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class UserConfig(Base):
    __tablename__ = "USERCONFIG"
    
    ID_CONFIG = Column(Integer, primary_key=True, index=True)
    ID_PROFILE = Column(Integer, ForeignKey("PROFILE.ID_PROFILE"), nullable=False)
    PUBLIC_PROFILE = Column(Boolean, default=True)
    NOTIFICATION_BY_MAIL = Column(Boolean, default=True)
    JOB_ALERT = Column(Boolean, default=True)
    LANGUAGE = Column(String, default="Español")

    # Relación con Profile
    profile = relationship("Profile")
