import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
from urllib.parse import quote_plus

load_dotenv()

server = os.getenv("DB_SERVER")
database = os.getenv("DB_NAME")
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
port = os.getenv("DB_PORT")
driver = os.getenv("ODBC_DRIVER")

if None in [server, database, user, password, port, driver]:
    raise Exception("Faltan variables de entorno. Revisa tu archivo .env")

# Codificar el driver correctamente
driver_encoded = quote_plus(driver)

connection_string = (
    f"mssql+pyodbc://{user}:{quote_plus(password)}@{server},{port}/{database}"
    f"?driver={driver_encoded}&Encrypt=yes&TrustServerCertificate=yes"
)

engine = create_engine(connection_string, echo=True, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
