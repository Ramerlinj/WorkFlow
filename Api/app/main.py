from fastapi import FastAPI
from app.routes import user_routes
from app.routes import testimonials_routes
from app.routes import profile_routes
from app.routes import skill_routes
from app.routes import work_experience_routes
from app.routes import employment_routes

app = FastAPI(
    title="Mi API workflow",
    description="API para manejar usuario",
    version="0.1.0"
)

app.include_router(user_routes.router, tags=["Usuarios"])
app.include_router(testimonials_routes.router, tags=["testimonials"])
app.include_router(profile_routes.router, tags=["profiles"])
app.include_router(skill_routes.router, tags=["skills y user_skills"])
app.include_router(work_experience_routes.router, tags=["work_experience"])
app.include_router(employment_routes.router, tags=["employments"])


