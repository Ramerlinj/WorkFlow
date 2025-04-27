from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional, List

from app.schemas.profile import ProfileResponse
from app.schemas.skills import SkillResponse
from app.schemas.link import LinkResponse
from app.schemas.workexperience import WorkExperienceResponse
from app.schemas.userconfig import UserConfigResponse

class UserFullResponse(BaseModel):
    id_user: int
    username: str
    first_name: str
    middle_name: Optional[str] = None
    first_surname: str
    second_surname: Optional[str] = None
    email: str
    date_of_birth: date
    creation_date: datetime

    profile: Optional[ProfileResponse] = None
    skills: List[SkillResponse] = []
    links: List[LinkResponse] = []
    work_experience: List[WorkExperienceResponse] = []
    user_config: Optional[UserConfigResponse] = None

    class Config:
        from_attributes = True
