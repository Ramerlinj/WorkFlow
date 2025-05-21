from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jwt import PyJWTError
from app.database.conexion import SessionLocal
from app.models.user import User
from app.schemas.users import UserCreate, UserLogin
from app.utils.hashing import Hash

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()  

def login_user(db: Session, payload: UserLogin) -> str:
    user = db.query(User).filter(User.username == payload.username).first()
    if not user or not Hash.verify_password(payload.password, user.hash_password):
        raise HTTPException(status_code=401, detail="Usuario o contraseña incorrectos")
    # Genera JWT con user.id_user
    return Hash.create_access_token(user.id_user)

def register_user(db: Session, payload: UserCreate) -> User:
    if db.query(User).filter(User.username == payload.username).first():
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    hashed_pw = Hash.get_password_hash(payload.password)
    new = User(
        id_profession=payload.id_profession,
        username=payload.username,
        email=payload.email,
        hash_password=hashed_pw,
        first_name=payload.first_name,
        middle_name=payload.middle_name,
        first_surname=payload.first_surname,
        second_surname=payload.second_surname,
        date_of_birth=payload.date_of_birth,
        direction=payload.direction,
        # creation_date se asigna por defecto en el modelo
    )
    db.add(new)
    db.commit()
    db.refresh(new)
    return new

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> User:
    try:
        payload = Hash.decode_access_token(token)
        user_id = int(payload.get("sub"))
    except PyJWTError:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
    user = db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")
    return user
