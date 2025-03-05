from datetime import datetime
from typing import List, Optional, Union
from pydantic import BaseModel


class ModelBaseInfo(BaseModel):
    id: int
    created_at: datetime
    updated_at: datetime

class Response(BaseModel):
    status_code: int
    message: str
    data: list

class Task(BaseModel):
    title: str
    user_email: str
    description: str
    status: str
    created: Optional[datetime.datetime] = None
    updated: Optional[datetime.datetime] = None