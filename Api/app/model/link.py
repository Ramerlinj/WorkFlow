from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Link(Base):
    __tablename__ = "LINKS"
    
    ID_LINKS = Column(Integer, primary_key=True)
    ID_USER = Column(Integer, ForeignKey("USERS.ID_USER"), nullable=False)
    NAME = Column(String(20), nullable=False)
    URL = Column(String(255), nullable=False)

    # Relación inversa con User
    user = relationship("User", back_populates="links")
