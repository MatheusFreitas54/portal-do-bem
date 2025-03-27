import os

from pymongo import MongoClient
from pymongo.server_api import ServerApi
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer

class Config:
    MONGODB_USER: str
    MONGODB_PASSWORD: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: str

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

    db_client: MongoClient

    def __init__(self):
        self.load_environment_variables()
        self.init_database()

    def load_environment_variables(self):
        env_var_keys = [
            "MONGODB_USER",
            "MONGODB_PASSWORD",
            "SECRET_KEY",
            "ALGORITHM",
            "ACCESS_TOKEN_EXPIRE_MINUTES"
        ]

        for key in env_var_keys:
            variable_value = os.getenv(key)
            if variable_value is None:
                raise EnvironmentError(f"The environment variable {key} is not set")
            self.__setattr__(key, os.getenv(key))

    def init_database(self):
        uri = f"mongodb+srv://{self.MONGODB_USER}:{self.MONGODB_PASSWORD}@portaldobem.fp4ct.mongodb.net/?appName=PortalDoBem"

        self.db_client = MongoClient(uri, server_api=ServerApi('1'))
        try:
            self.db_client.admin.command('ping')
            print("Pinged database. You successfully connected to MongoDB!")
        except Exception as e:
            print(e)

config = Config()