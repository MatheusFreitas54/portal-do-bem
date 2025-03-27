from typing import TypeVar, Generic

from bson import ObjectId
from pymongo.results import InsertOneResult, InsertManyResult, DeleteResult, UpdateResult
from config import config
from pymongo.database import Database
from pymongo.collection import Collection
from pymongo.cursor import Cursor

Model = TypeVar('Model')
ModelInDB = TypeVar('ModelInDB')


def _convert_id_in_filter(filters=None):
    if not filters:
        return

    if filters.get('_id'):
        filters['_id'] = ObjectId(filters['_id'])


class BaseRepository(Generic[Model, ModelInDB]):
    db: Database
    collection: Collection[ModelInDB]

    def __init__(self, collection: str):

        self.db = config.db_client['portal-do-bem']
        self.collection = self.db[collection]

    def insert_one(self, model: Model) -> InsertOneResult:
        return self.collection.insert_one(model.dict())

    def insert_many(self, models: list[Model]) -> InsertManyResult:
        return self.collection.insert_many([model.dict() for model in models])

    def find_one(self, filters: dict) -> ModelInDB | None:
        _convert_id_in_filter(filters)
        return self.collection.find_one(filter=filters)

    def find_many(self, filters=None) -> Cursor[ModelInDB]:
        if filters is None:
            filters = {}

        _convert_id_in_filter(filters)
        return self.collection.find(filter=filters)

    def delete_one(self, filters: dict) -> DeleteResult:
        _convert_id_in_filter(filters)
        return self.collection.delete_one(filter=filters)

    def delete_many(self, filters: dict) -> DeleteResult:
        _convert_id_in_filter(filters)
        return self.collection.delete_many(filter=filters)

    def update_one(self, filters: dict, model: Model) -> UpdateResult:
        _convert_id_in_filter(filters)
        return self.collection.update_one(filter=filters, update={'$set': model.dict()})