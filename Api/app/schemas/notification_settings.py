from pydantic import BaseModel, Field

class NotificationSettingsBase(BaseModel):
    id_user: int
    by_email: bool = True
    by_sms: bool = False
    push_notifications: bool = False

class NotificationSettingsCreate(NotificationSettingsBase):
    pass

class NotificationSettingsResponse(NotificationSettingsBase):
    id_notif: int

    class Config:
        from_attributes = True