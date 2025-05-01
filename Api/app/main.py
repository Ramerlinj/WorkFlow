from fastapi import FastAPI
from app.routes import user_routes


app = FastAPI(
    title="Mi API de Usuarios",
    description="API para manejar usuario",
    version="0.0.1"
)

app.include_router(user_routes.router, tags=["Usuarios"])
