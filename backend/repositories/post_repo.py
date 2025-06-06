from models import Post, PostInDB
from .base_repo import BaseRepository


class PostRepository(BaseRepository[Post, PostInDB]):
    def __init__(self, collection: str):
        super().__init__(collection)


post_repo = PostRepository('posts')