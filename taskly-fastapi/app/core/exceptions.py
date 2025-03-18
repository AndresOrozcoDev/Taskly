import logging
import os
import traceback
from fastapi import Request, HTTPException, FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder


def Standard_response(status_code: int, message: str, data: any = None):
    response_content = {
        "success": 200 <= status_code < 300,
        "status_code": status_code,
        "message": message,
    }
    if data is not None:
        response_content["data"] = jsonable_encoder(data)
    return JSONResponse(status_code=status_code, content=response_content)

def add_exception_handlers(app: FastAPI):

    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        logging.error(f"HTTPException: {exc.detail} - URL: {request.url}")
        return Standard_response(exc.status_code, exc.detail)

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        logging.error(f"ValidationError: {exc.errors()} - URL: {request.url}")
        return Standard_response(422, "Datos de entrada no válidos", exc.errors())

    @app.exception_handler(Exception)
    async def generic_exception_handler(request: Request, exc: Exception):
        error_trace = traceback.format_exc()
        logging.error(f"Unhandled Exception: {error_trace} - URL: {request.url}")
        return Standard_response(500, "Ocurrió un error inesperado", str(exc))
