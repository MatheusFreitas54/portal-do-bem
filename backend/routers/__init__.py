from fastapi import APIRouter

from .auth import router as auth_router
from .post import router as posts_router
from .user import router as users_router

api_router = APIRouter(
    prefix="/api",
    tags=["api"],
    responses={404: {"description": "Not found"}},
)

api_router.include_router(auth_router)
api_router.include_router(posts_router)
api_router.include_router(users_router)