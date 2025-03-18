import os
from typing import List

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

class Configs(BaseSettings):
    # base
    PORT_FASTAPI: int = os.getenv("PORT_FASTAPI", 8000)

    # auth
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 30

    # urls
    URL_FRONTEND: str = os.getenv("https://67d8b69e98132f42d85964f5--luminous-starship-eb26e8.netlify.app/", "http://localhost:4200")