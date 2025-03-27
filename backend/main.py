import dotenv
dotenv.load_dotenv()
import config

from fastapi import FastAPI
from routers import api_router

app = FastAPI()

app.include_router(api_router)
@app.get("/")
def read_root():
    return {"Hello": "World"}