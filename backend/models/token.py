from datetime import timedelta

from pydantic import BaseModel

from models.py_object_id import PyObjectId


class Token(BaseModel):
    access_token: str
    token_type: str
    expires_in: timedelta
    granted_at: str

class TokenData(BaseModel):
    username: str
