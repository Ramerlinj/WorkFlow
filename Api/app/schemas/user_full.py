from pydantic import BaseModel, EmailStr
from datetime import date, datetime
from typing import List, Optional

from .profile import ProfileResponse
from .link import LinkResponse
from .workexperience import WorkExperienceResponse
from .skills import SkillResponse
from .userconfig import UserConfigResponse

class UserFullResponse(BaseModel):
    id_user: int
    username: str
    first_name: str
    middle_name: Optional[str]
    first_surname: str
    second_surname: Optional[str]
    email: EmailStr
    date_of_birth: date
    creation_date: datetime

    profile: Optional[ProfileResponse] = None
    links: List[LinkResponse] = []
    skills: List[SkillResponse] = []
    work_experience: List[WorkExperienceResponse] = []
    config: Optional[UserConfigResponse] = None

    class Config:
        orm_mode = True
