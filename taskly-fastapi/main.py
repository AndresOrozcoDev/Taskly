import os
import uvicorn

from fastapi import FastAPI

# Variables de entorno
PORT_FASTAPI = int(os.getenv("PORT_FASTAPI", 8000))

# Configuracion de Swagger
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
            "url": f"http://localhost:{PORT_FASTAPI}",
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

# Ejecución de la aplicación
if __name__ == "__main__":
    port = int(os.getenv("PORT", PORT_FASTAPI))
    uvicorn.run("main:app", host="0.0.0.0", port=port)