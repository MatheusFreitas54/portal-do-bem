from typing import Literal, Any

from bson import ObjectId
from pydantic import BaseModel, Field

from models.py_object_id import PyObjectId


class MongoBaseModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    @property
    def _id(self):
        return self.id

    def __init__(self, **kwargs) -> None:
        if kwargs.get("_id"):
            kwargs["_id"] = str(kwargs["_id"])
        super().__init__(**kwargs)

    def model_dump(
        self,
        *,
        mode: Literal['json', 'python'] | str = 'python',
        include: Any | None = None,
        exclude: Any | None = None,
        context: Any | None = None,
        by_alias: bool = True,
        exclude_unset: bool = False,
        exclude_defaults: bool = False,
        exclude_none: bool = False,
        round_trip: bool = False,
        warnings: bool | Literal['none', 'warn', 'error'] = True,
        serialize_as_any: bool = False,
    ) -> dict[str, Any]:
        return super().model_dump(
            mode=mode,
            by_alias=by_alias,
            include=include,
            exclude=exclude,
            context=context,
            exclude_unset=exclude_unset,
            exclude_defaults=exclude_defaults,
            exclude_none=exclude_none,
            round_trip=round_trip,
            warnings=warnings,
            serialize_as_any=serialize_as_any,
        )

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }