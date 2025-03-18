from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

def add_middlewares(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Otros middlewares personalizados pueden agregarse aquí...
