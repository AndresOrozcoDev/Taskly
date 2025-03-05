import os
import uvicorn

from fastapi import FastAPI

from app.core.database import engine, Base
from app.core.config import Configs
from app.api.v1.routes import api_router

configs = Configs()

app = FastAPI(
    title='Task API',
    description='Documentación generada con Swagger para una aplicacion de FastAPI sobre la gestion de tareas.',
    version='0.1.0',
    contact={
        'name': 'Andres Orozco',
        'url': 'https://github.com/AndresOrozcoDev',
        'email': 'andres.orozco.dev@gmail.com',
    },
    servers=[
        {
            "url": f"http://localhost:{configs.PORT_FASTAPI}",
            "description": "Local server",
        },
        {
            "url": '',
            "description": 'Development server',
        }
    ],
    tags=[
      {
        "name": 'Task',
        "description": 'Endpoints for managing tasks',
      }
    ],
)

app.include_router(api_router)
Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=configs.PORT_FASTAPI)