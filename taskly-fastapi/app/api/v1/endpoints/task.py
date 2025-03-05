from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.services.task import TaskServices

from app.core.database import Session

router = APIRouter()

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()

@router.get('',)
async def get_tasks():
    result = TaskServices(db).get_tasks()
    return {result}