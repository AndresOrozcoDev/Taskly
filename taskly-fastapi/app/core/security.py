import os

from fastapi import Security, HTTPException
from fastapi.security import APIKeyHeader

API_KEY = os.getenv("API_KEY", "dev")
api_key_header = APIKeyHeader(name="API_KEY", auto_error=False)

def get_api_key(api_key: str = Security(api_key_header)):
    if api_key is None or api_key != API_KEY:
        raise HTTPException(
            status_code=403,
            detail="Falta la clave API o no es válida"
        )
    return api_key