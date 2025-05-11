from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional, List

from app.schemas.profiles import ProfileRead
from app.schemas.skills import SkillRead
from app.schemas.links import LinkRead
from app.schemas.work_experience import WorkExperienceRead
from app.schemas.user_config import UserConfigRead
from app.schemas.notification_settings import NotificationSettingsRead
from app.schemas.users import UserRead
from app.schemas.professions import ProfessionRead
from app.schemas.locations import LocationRead
from app.schemas.countries import CountryRead
from app.schemas.user_skills import UserSkillRead
from app.schemas.job_applications import JobApplicationRead
from app.schemas.testimonials import TestimonialRead

class UserFullResponse(BaseModel):
    # Basic user info
    id_user: int
    username: str
    email: str
    first_name: str
    middle_name: Optional[str] = None
    first_surname: str
    second_surname: Optional[str] = None
    date_of_birth: date
    creation_date: datetime

    # Related one-to-one / one-to-many
    profession: Optional[ProfessionRead] = None
    country: Optional[CountryRead] = None
    location: Optional[LocationRead] = None
    profile: Optional[ProfileRead] = None
    user_config: Optional[UserConfigRead] = None
    notification_settings: Optional[NotificationSettingsRead] = None

    # Collections
    skills: List[SkillRead] = []
    user_skills: List[UserSkillRead] = []
    links: List[LinkRead] = []
    work_experience: List[WorkExperienceRead] = []
    applications: List[JobApplicationRead] = []
    testimonials_received: List[TestimonialRead] = []
    testimonials_given: List[TestimonialRead] = []

    class Config:
        from_attributes = True