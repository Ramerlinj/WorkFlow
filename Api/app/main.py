from fastapi import FastAPI
from routes import user_routes  # importa tu archivo de rutas

app = FastAPI(
    title="Mi API de Usuarios",
    description="API para manejar perfiles de usuario",
    version="1.0.0"
)

# Incluir tus rutas
app.include_router(user_routes.router, tags=["Usuarios"])
