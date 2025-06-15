# Taskly - Express

Este proyecto fue generado usando [ExpressJS Generator](https://expressjs.com/en/starter/generator.html) version de express 4.21.2 para crear servicios web HTTP sobre la administracion y manejo de usuarios.

## Construido

En esta sección se mostrara las herramientas o frameworks utilizados:

- [![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
- [![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](#)
- [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)](#)

## Demo

Aquí está el enlace para visualizar la documentacion de Swagger: [Servicios Web](https://fullstack-angular-react-fastapi-express-1.onrender.com/docs/)

## Ejecucion de desarrollo

Instalacion de dependencias

```bash
npm i
```

Crear el servidor

```bash
npm run dev
```

## Ejecucion con Docker

Creación del contenedor
```bash
docker build -t <name> .
```

Ejecución del contenedor
```bash
docker run -p 4200:80 <name_container>
```

## Resumen de Parámetros o Encabezados

| **Servicio**                     | **Método** | **Cuerpo (Body)**                                      | **Encabezado (Header)**                              |
|-----------------------------------|------------|-------------------------------------------------------|-----------------------------------------------------|
| **Registro de Usuario**           | `POST`     | `email`, `password`, `rol` (opcional)                 | Ninguno                                              |
| **Inicio de Sesión**              | `POST`     | `email`, `password`                                   | Ninguno                                              |
| **Obtener Usuario Autenticado**   | `GET`      | Ninguno                                               | `Authorization: Bearer tu_token_aqui`               |
| **Recuperar Contraseña**          | `POST`     | `email`                                               | Ninguno                                              |
| **Verificar Correo Existente**    | `POST`     | `email`                                               | Ninguno                                              |

## Migraciones

Cuando se realice un cambio estructural en la base de datos (agregar, editar o quitar columnas en las tablas) y se queria actualizar la base de datos sin perder los datos insertados alli, se debe migrar la base de datos con el siguiente comando de Alembic:

```bash
npx knex migrate:make create_tables
```

Para aplicar los cambios en la base de datos `.sqlite` se requiere el siguiente comando:

```bash
npx knex migrate:latest --env production
```

## Visualizador de la base de datos
Puedes visualizar el archivo .sqlite con [SQLite Viewer](https://sqliteviewer.app/) subiendo el archivo.

---

## Autor

**Andrés Orozco**
- [GitHub](https://github.com/AndresOrozcoDev)
- [LinkedIn](https://www.linkedin.com/in/andresorozcodev/)

---