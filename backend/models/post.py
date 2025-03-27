from .base import MongoBaseModel, BaseModel
from .py_object_id import PyObjectId


class Post(BaseModel):
    title: str
    content: str
    user_id: PyObjectId


class PostInDB(MongoBaseModel, Post):
    pass