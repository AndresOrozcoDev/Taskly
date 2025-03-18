import os
import uvicorn

from fastapi import FastAPI
from app.core.exceptions import add_exception_handlers
from app.core.middleware import add_middlewares

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
            "url": f"{configs.URL_FRONTEND}",
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

# Agregar excepciones y middlewares
add_exception_handlers(app)
add_middlewares(app)

# Rutas principales
app.include_router(api_router)

# Instancia de la base de datos
Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=configs.PORT_FASTAPI)