from pydantic import BaseModel

class UserConfigCreate(BaseModel):
    id_profile: int
    public_profile: bool = True
    notification_by_mail: bool = True
    job_alert: bool = True
    language: str = "Español"

class UserConfigResponse(UserConfigCreate):
    id_config: int

    class Config:
        orm_mode = True
