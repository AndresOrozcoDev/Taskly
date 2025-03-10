# Taskly - FastAPI

Proyecto backend creado basado en Python v3.13.0 con FastAPI v0.115.4 para la gestion de tares en una base de datos SQLite3.

## Construido

En esta sección se deben incluir los principales frameworks y bibliotecas que se utilizaron para iniciar el proyecto. Los complementos y plugins se pueden dejar para la sección de agradecimientos. A continuación se muestran algunos ejemplos.

* [![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff)](#)
* [![FastAPI](https://img.shields.io/badge/FastAPI-009485.svg?logo=fastapi&logoColor=white)](#)
* [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)](#)

## Demo

Aquí está el enlace para visualizar la documentacion de Swagger: [Servicios Web]()

## Ejecucion de desarrollo

Activar entorno virtual
```bash
env\Scripts\activate
```

```bash
python main.py
```

## Migraciones

Cuando se realice un cambio estructural en la base de datos (agregar, editar o quitar columnas en las tablas) y se queria actualizar la base de datos sin perder los datos insertados alli, se debe migrar la base de datos con el siguiente comando de Alembic:

```bash
alembic revision --autogenerate -m "Agregando columna estado a tareas"
```

Para aplicar los cambios en mi base de datos `.sqlite` se requiere el siguiente comando:

```bash
alembic upgrade head
```

## Andamio de codigo

Instalar entorno virtual
```bash
python -m venv env
```

Instalar dependencias
```bash
pip install -r requirements.txt
```

Crear o modificar archivo de dependencias
```bash
pip freeze > requirements.txt
```

## Pruebas unitarias

Para la verificacion de codigo se usan pruebas unitarias con la herramienta de Pytest con Httpx y se ejecuta con el siguiente comando:

```bash
pytest
```

## Visualizador de la base de datos
Puedes visualizar el archivo .sqlite con [SQLite Viewer](https://sqliteviewer.app/) subiendo el archivo.

---

## Autor

**Andrés Orozco**
- [GitHub](https://github.com/AndresOrozcoDev)
- [LinkedIn](https://www.linkedin.com/in/andresorozcodev/)

---