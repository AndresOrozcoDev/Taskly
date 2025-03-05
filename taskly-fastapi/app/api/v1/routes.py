from fastapi import APIRouter
from app.api.v1.endpoints import task
from app.api.dependencies.security import get_api_key


api_router = APIRouter()

api_router.include_router(task.router, prefix="/api/v1/tasks", tags=["Task"])