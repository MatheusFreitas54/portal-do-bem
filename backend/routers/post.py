from fastapi import APIRouter, Depends, HTTPException
from models import Post, PostInDB
from repositories import post_repo
from typing import Annotated
from auth import get_current_active_user

router = APIRouter(
    prefix="/posts",
    tags=["posts"],
)


@router.get("/", response_model=list[PostInDB])
def read_posts():
    return post_repo.find_many()


@router.get("/{post_id}/", response_model=PostInDB)
def read_post(post_id: int):
    return post_repo.find_one({"_id": post_id})


@router.post("/", response_model=str)
def create_post(
    post: Post,
    current_user: Annotated[PostInDB, Depends(get_current_active_user)],
):
    if post.user_id != current_user.id:
        raise HTTPException(status_code=403)

    created_id = post_repo.insert_one(post).inserted_id
    return str(created_id)


@router.put("/", response_model=str)
def update_post(
    post: Post,
    current_user: Annotated[PostInDB, Depends(get_current_active_user)],
):
    if post.user_id != current_user.id:
        raise HTTPException(status_code=403)
    updated_id = post_repo.update_one({"_id": post.id}, post).upserted_id
    return str(updated_id)


@router.delete("/{post_id}/", response_model=int)
def delete_post(
    post_id: int,
    current_user: Annotated[PostInDB, Depends(get_current_active_user)],
):
    to_delete = post_repo.find_one({"_id": post_id})
    if to_delete is None:
        raise HTTPException(status_code=404)

    if to_delete.user_id != current_user.id:
        raise HTTPException(status_code=403)

    return post_repo.delete_one({"_id": post_id}).deleted_count
