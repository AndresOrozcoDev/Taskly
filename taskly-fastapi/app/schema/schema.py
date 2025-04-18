from datetime import datetime
from typing import List, Optional, Union, Literal
from pydantic import BaseModel


class Response(BaseModel):
    status_code: int
    message: str
    data: list

class Task(BaseModel):
    title: str
    user_email: str
    description: str
    status: Literal['pending', 'progress', 'completed']
    created: Optional[datetime] = None
    updated: Optional[datetime] = None