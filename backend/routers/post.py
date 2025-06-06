from fastapi import APIRouter, Depends, HTTPException
from models import Post, PostInDB
from repositories import post_repo
from typing import Annotated
from auth import get_current_active_user
from bson import ObjectId
from bson.errors import InvalidId

router = APIRouter(
    prefix="/posts",
    tags=["posts"],
)

# 🔧 Funções auxiliares para conversão de ObjectId
def convert_post_objectid_to_str(post: dict) -> dict:
    if not post:
        return None
    post["id"] = str(post["_id"])
    post["_id"] = str(post["_id"])
    if "user_id" in post and isinstance(post["user_id"], ObjectId):
        post["user_id"] = str(post["user_id"])
    return post


def convert_posts_objectid_to_str(posts: list[dict]) -> list[dict]:
    return [convert_post_objectid_to_str(post) for post in posts]


# ✅ Listar todos os posts
@router.get("/", response_model=list[PostInDB])
def read_posts():
    posts = post_repo.find_many()
    return convert_posts_objectid_to_str(posts)


# ✅ Obter um post por ID
@router.get("/{post_id}/", response_model=PostInDB)
def read_post(post_id: str):
    try:
        object_id = ObjectId(post_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="ID inválido")

    post = post_repo.find_one({"_id": object_id})
    if not post:
        raise HTTPException(status_code=404, detail="Post não encontrado")
    return convert_post_objectid_to_str(post)


# ✅ Buscar todos os posts de um usuário específico
@router.get("/user/{user_id}/", response_model=list[PostInDB])
def read_posts_by_user(user_id: str):
    try:
        user_object_id = ObjectId(user_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="ID de usuário inválido")

    posts = post_repo.find_many({"user_id": user_object_id})
    return convert_posts_objectid_to_str(posts)


# ✅ Criar um post
@router.post("/", response_model=str)
def create_post(
    post: Post,
    current_user: Annotated[PostInDB, Depends(get_current_active_user)],
):
    if post.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Ação não permitida")

    created_id = post_repo.insert_one(post).inserted_id
    return str(created_id)


# ✅ Atualizar um post
@router.put("/", response_model=str)
def update_post(
    post: Post,
    current_user: Annotated[PostInDB, Depends(get_current_active_user)],
):
    if post.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Ação não permitida")

    result = post_repo.update_one({"_id": ObjectId(post.id)}, post)
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Post não encontrado")
    return str(post.id)


# ✅ Deletar um post
@router.delete("/{post_id}/", response_model=int)
def delete_post(
    post_id: str,
    current_user: Annotated[PostInDB, Depends(get_current_active_user)],
):
    try:
        object_id = ObjectId(post_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="ID inválido")

    to_delete = post_repo.find_one({"_id": object_id})
    if to_delete is None:
        raise HTTPException(status_code=404, detail="Post não encontrado")

    if str(to_delete["user_id"]) != current_user.id:
        raise HTTPException(status_code=403, detail="Ação não permitida")

    result = post_repo.delete_one({"_id": object_id})
    return result.deleted_count
from fastapi import APIRouter, Depends, HTTPException
from models import Post, PostInDB
from repositories import post_repo
from typing import Annotated
from auth import get_current_active_user
from bson import ObjectId
from bson.errors import InvalidId

router = APIRouter(
    prefix="/posts",
    tags=["posts"],
)

def convert_post_objectid_to_str(post: dict) -> dict:
    if not post:
        return None
    post["id"] = str(post["_id"])
    post["_id"] = str(post["_id"])
    if "user_id" in post and isinstance(post["user_id"], ObjectId):
        post["user_id"] = str(post["user_id"])
    return post


def convert_posts_objectid_to_str(posts: list[dict]) -> list[dict]:
    return [convert_post_objectid_to_str(post) for post in posts]


@router.get("/", response_model=list[PostInDB])
def read_posts():
    posts = post_repo.find_many()
    return convert_posts_objectid_to_str(posts)


@router.get("/{post_id}/", response_model=PostInDB)
def read_post(post_id: str):
    try:
        object_id = ObjectId(post_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="ID inválido")

    post = post_repo.find_one({"_id": object_id})
    if not post:
        raise HTTPException(status_code=404, detail="Post não encontrado")
    return convert_post_objectid_to_str(post)


@router.get("/user/{user_id}/", response_model=list[PostInDB])
def read_posts_by_user(user_id: str):
    try:
        user_object_id = ObjectId(user_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="ID de usuário inválido")

    posts = post_repo.find_many({"user_id": user_object_id})
    return convert_posts_objectid_to_str(posts)


@router.post("/", response_model=str)
def create_post(
    post: Post,
    current_user: Annotated[PostInDB, Depends(get_current_active_user)],
):
    if post.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Ação não permitida")

    created_id = post_repo.insert_one(post).inserted_id
    return str(created_id)

@router.put("/", response_model=str)
def update_post(
    post: Post,
    current_user: Annotated[PostInDB, Depends(get_current_active_user)],
):
    if post.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Ação não permitida")

    result = post_repo.update_one({"_id": ObjectId(post.id)}, post)
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Post não encontrado")
    return str(post.id)


@router.delete("/{post_id}/", response_model=int)
def delete_post(
    post_id: str,
    current_user: Annotated[PostInDB, Depends(get_current_active_user)],
):
    try:
        object_id = ObjectId(post_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="ID inválido")

    to_delete = post_repo.find_one({"_id": object_id})
    if to_delete is None:
        raise HTTPException(status_code=404, detail="Post não encontrado")

    if str(to_delete["user_id"]) != current_user.id:
        raise HTTPException(status_code=403, detail="Ação não permitida")

    result = post_repo.delete_one({"_id": object_id})
    return result.deleted_count