from pydantic import BaseModel

class UserConfigCreate(BaseModel):
    public_profile: bool = True
    notification_by_mail: bool = True
    job_alert: bool = True
    language: str = "Español"

class UserConfigResponse(UserConfigCreate):
    id_config: int

    class Config:
        from_attributes = True