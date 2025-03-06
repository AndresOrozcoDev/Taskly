from fastapi import APIRouter, HTTPException, Body, Depends, Path
from fastapi.responses import JSONResponse
from app.services.task import TaskServices
from app.schema.schema import Response, Task
from fastapi.encoders import jsonable_encoder

from app.core.database import Session

router = APIRouter()

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()

@router.get('')
async def get_tasks(db: Session = Depends(get_db)):
    result = TaskServices(db).get_tasks()
    return jsonable_encoder(result)

@router.post('')
async def post_task(db: Session = Depends(get_db), task: Task = Body()):
    result = TaskServices(db).post_task(task)
    return {result}

@router.put('/{id}')
async def put_task(db: Session = Depends(get_db), id: int = Path(), task: Task = Body()):
    result = TaskServices(db).put_task(id, task)
    return {result}

@router.delete('/{id}')
async def delete_task(db: Session = Depends(get_db), id: int = Path()):
    result = TaskServices(db).delete_task(id)
    return {result}