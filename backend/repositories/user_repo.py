from models import User, UserInDB
from .base_repo import BaseRepository


class UserRepository(BaseRepository[User, UserInDB]):

    def __init__(self, collection: str):
        super().__init__(collection)
        self.collection.create_index("email", unique=True)
        self.collection.create_index("username", unique=True)

    def find_one(self, filters: dict) -> UserInDB | None:
        result = super().find_one(filters)
        if not result:
            return None

        converted = UserInDB(**result)
        print(converted.model_dump(by_alias=True))
        return converted

    def find_many(self, filters=None) -> list[UserInDB]:
        results = super().find_many(filters)
        return [UserInDB(**result) for result in results]

user_repo = UserRepository('users')