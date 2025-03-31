from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

def add_middlewares(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:4200",
            "https://luminous-starship-eb26e8.netlify.app",
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    