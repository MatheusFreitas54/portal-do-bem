import dotenv
dotenv.load_dotenv()
import config

from fastapi import FastAPI
from routers import api_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(api_router)
@app.get("/")
def read_root():
    return {"Hello": "World"}