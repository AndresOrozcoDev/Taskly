import os
from typing import List

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

class Configs(BaseSettings):
    # base
    PORT_FASTAPI: int = os.getenv("PORT_FASTAPI", 8000)

    # BD
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./local.sqlite")

    # urls
    URL_FRONTEND: str = os.getenv("https://luminous-starship-eb26e8.netlify.app", "http://localhost:4200")