import os
import pyodbc
from dotenv import load_dotenv

# Cargar las variables de entorno
load_dotenv()

DB_SERVER = os.getenv("DB_SERVER")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
ODBC_DRIVER = os.getenv("ODBC_DRIVER")

# Armar connection string compatible con Azure y Driver 18
connection_string = (
    f"DRIVER={{{ODBC_DRIVER}}};"
    f"SERVER={DB_SERVER},{DB_PORT};"
    f"DATABASE={DB_NAME};"
    f"UID={DB_USER};PWD={DB_PASSWORD};"
    f"Encrypt=yes;"
    f"TrustServerCertificate=yes;"
)

conn = None

try:
    print(f"Conectando a: {DB_SERVER}:{DB_PORT} -> {DB_NAME}")
    conn = pyodbc.connect(connection_string)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM USERS Where username = 'ramerlin'")
    rows = cursor.fetchall()
    for row in rows:
        print(row)
    print(" Conexión exitosa y consulta realizada")
except Exception as e:
    print(f" Error al ejecutar la consulta: {e}")
finally:
    if conn:
        conn.close()
