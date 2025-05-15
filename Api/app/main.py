from fastapi import FastAPI
from app.routes import user_routes
from app.routes import testimonials_routes
from app.routes import profile_routes

app = FastAPI(
    title="Mi API de Usuarios",
    description="API para manejar usuario",
    version="0.1.0"
)

app.include_router(user_routes.router, tags=["Usuarios"])
app.include_router(testimonials_routes.router, tags=["testimonials"])
app.include_router(profile_routes.router, tags=["profiles"])
