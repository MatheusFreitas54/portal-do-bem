from .base import MongoBaseModel, BaseModel

class User(BaseModel):
    username: str
    email: str | None = None
    disabled: bool = False

class UserWithPassword(User):
    password: str

class UserCreate(User):
    hashed_password: str

class UserInDB(MongoBaseModel, UserCreate):
    pass