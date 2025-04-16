import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
from urllib.parse import quote_plus

load.dotenv()
driver_encoded = quote_plus(driver)

sever = os.getenv("DB_SERVER")
database = os.getenv("DB_DATABASE")
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
port = os.getenv("DB_PORT")
driver = os.getenv("DB_DRIVER")
connection_string = f"mssql+pyodbc://{user}:{quote_plus(password)}@{sever}:{port}/{database}?driver={driver_encoded}&Encrypt=yes&TrustServerCertificate=no&Connection Timeout=30"
engine = create_engine(connection_string, echo=True, future=True)
Session = sessionmaker(bind=engine, auto_commit=False, autoflush=False)
Base = declarative_base()