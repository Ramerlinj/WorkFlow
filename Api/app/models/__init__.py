# app/models/__init__.py

from app.models.user import User
from app.models.profile import Profile
from app.models.skill import Skill
from app.models.user_skills import UserSkill
from app.models.link import Link
from app.models.work_experience import WorkExperience
from app.models.user_config import UserConfig
from app.models.profession import Profession
from app.models.country import Country
from app.models.location import Location
from app.models.link_type import LinkType
from app.models.employment import Employment
from app.models.job_application import JobApplication
from app.models.testimonials import Testimonial
from app.models.notification_settings import NotificationSettings
from app.models.type_job import TypeJob

from app.models.testimonial_comment import TestimonialComment

from sqlalchemy.orm import relationship
Testimonial.comments = relationship(
    "TestimonialComment",
    back_populates="testimonial",
    cascade="all, delete-orphan"
)
