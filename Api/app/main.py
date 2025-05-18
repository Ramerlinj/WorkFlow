from fastapi import FastAPI
from app.routes import user_routes
from app.routes import testimonials_routes
from app.routes import profile_routes
from app.routes import skill_routes
from app.routes import work_experience_routes
from app.routes import employment_routes
from app.routes import link_routes
from app.routes import profession_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Mi API workflow",
    description="API para manejar usuario",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(user_routes.router, tags=["Usuarios"])
app.include_router(testimonials_routes.router, tags=["testimonials"])
app.include_router(profile_routes.router, tags=["profiles"])
app.include_router(skill_routes.router, tags=["skills y user_skills"])
app.include_router(work_experience_routes.router, tags=["work_experience"])
app.include_router(employment_routes.router, tags=["employments"])
app.include_router(link_routes.router, tags=["links"])
app.include_router(profession_routes.router, tags=["professions"])


