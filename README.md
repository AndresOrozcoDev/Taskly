# Taskly

## Descripcion del proyecto
Es una aplicacion web que permite gestionar tus propias tareas (Crear, editar o eliminar), ademas de una autenticacion dependiendo de roles con sus respectivos permisos (admin o user):

- **Admin** pueden administrar todas las tareas del sistema.
- **User** pueden administrar sus propias tareas.

## Estructura del proyecto

### **Angular**

- **Autenticacion:** Inicio se sesion, registro, restablecer contraseña.
- **Dashboard:** Dinamico dependiendo del rol.
- **Adaptable:** Diseño responsive a cualquier pantalla.
- **Notificaciones:** Mensajes de exito y error.
- **Pruebas unitarias:** Verificacion de codigo.

### **Express**

- **Gestion de autenticación:** Crear, editar y eliminar usuarios.
- **Comunicación:** Con REST.
- **Proteccion:** Por jsonwebtoken y bcrypt.
- **Respuestas:** Con el codigo de estado y mensaje descriptivo.
- **Documentacion:** Por Swagger.

### **FastAPI**

- **Gestion de tareas por usuarios:** Crear, editar y eliminar tareas.
- **Comunicación:** Con REST.
- **Proteccion:** Por header API_KEY.
- **Respuestas:** Con el codigo de estado y mensaje descriptivo.
- **Documentacion:** Por Swagger.

### Base de Datos

- **SQLite**
  - **Tabla `user`:** `id`, `email`, `password` y `rol`.
  - **Tabla `task`:** `id`, `title`, `description`, `user_email`, `status`, y `created`.
---


## Autor

**Andrés Orozco**
- [GitHub](https://github.com/AndresOrozcoDev)
- [LinkedIn](https://www.linkedin.com/in/andresorozcodev/)

---