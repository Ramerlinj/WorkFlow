from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional, List

from app.schemas.profile import ProfileResponse
from app.schemas.skills import SkillResponse
from app.schemas.links import LinkResponse
from app.schemas.work_experience import WorkExperienceResponse
from app.schemas.user_config import UserConfigResponse
from app.schemas.notification_settings import NotificationSettingsResponse
from app.schemas.users import UserResponse
from app.schemas.professions import ProfessionResponse
from app.schemas.locations import LocationResponse
from app.schemas.countries import CountryResponse
from app.schemas.user_skills import UserSkillResponse
from app.schemas.job_applications import JobApplicationResponse
from app.schemas.testimonials import TestimonialResponse

class UserFullResponse(BaseModel):
    # Basica user info
    id_user: int
    username: str
    email: str
    first_name: str
    middle_name: Optional[str] = None
    first_surname: str
    second_surname: Optional[str] = None
    date_of_birth: date
    creation_date: datetime

    profession: Optional[ProfessionResponse] = None
    country: Optional[CountryResponse] = None
    location: Optional[LocationResponse] = None
    profile: Optional[ProfileResponse] = None
    user_config: Optional[UserConfigResponse] = None
    notification_settings: Optional[NotificationSettingsResponse] = None

    # Colecciones
    skills: List[SkillResponse] = []
    user_skills: List[UserSkillResponse] = []
    links: List[LinkResponse] = []
    work_experience: List[WorkExperienceResponse] = []
    applications: List[JobApplicationResponse] = []
    testimonials_received: List[TestimonialResponse] = []
    testimonials_given: List[TestimonialResponse] = []

    class Config:
        from_attributes = True