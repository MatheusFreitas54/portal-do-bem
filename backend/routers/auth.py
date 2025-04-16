from fastapi import APIRouter, Depends, status, HTTPException
from models import Token, UserWithPassword, UserCreate
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from auth import get_password_hash, authorize_user
from repositories import user_repo

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

@router.post("/token/")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    return authorize_user(form_data.username, form_data.password)

@router.post("/signup/", response_model=str)
def signup_user(user: UserWithPassword):
    created_id = user_repo.insert_one(
        UserCreate(
            username=user.username,
            email=user.email,
            disabled=user.disabled,
            hashed_password=get_password_hash(user.password)
        )
    ).inserted_id
    return str(created_id)

