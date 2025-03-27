from fastapi import APIRouter, Depends
from models import User, UserInDB, UserWithPassword
from repositories import user_repo
from typing import Annotated
from auth import get_current_active_user

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.get("/me/", response_model=UserInDB)
async def read_user_me(
        current_user: Annotated[UserInDB, Depends(get_current_active_user)],
):
    return current_user

@router.get("/{user_id}/", response_model=UserInDB)
def read_user(user_id: str):
    return user_repo.find_one({"_id": user_id})

@router.get("/", response_model=list[UserInDB])
def read_users():
    return user_repo.find_many()


@router.put("/", response_model=str)
def update_user(user: User):
    updated_id = user_repo.update_one({"_id": user.id}, user).upserted_id
    return str(updated_id)


@router.delete("/{user_id}/", response_model=int)
def delete_user(user_id: str):
    return user_repo.delete_one({"id": user_id}).deleted_count
