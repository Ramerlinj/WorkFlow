# Este módulo se encarga de la autenticación y autorización de los usuarios.
# Proporciona una función para autenticar a un usuario verificando su nombre de usuario y contraseña.

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database.conexion import get_db
from app.models.user import User
from app.utils.hashing import Hash

# Configuración del esquema de autenticación OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')

def authenticate_user(db: Session, username: str, password: str):
    """
    Autentica a un usuario verificando su nombre de usuario y contraseña.

    Args:
        db (Session): Sesión de la base de datos.
        username (str): Nombre de usuario proporcionado.
        password (str): Contraseña proporcionada.

    Returns:
        User | bool: Retorna el usuario autenticado si las credenciales son correctas, 
                     de lo contrario, retorna False.
    """
    # Buscar al usuario en la base de datos por su nombre de usuario
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    # Verificar si la contraseña proporcionada coincide con la almacenada
    if not Hash.verify_password(password, user.hash_password):
        return False
    return user
