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
- **Almacenamiento:** Con base de datos SQLite3.
- **Comunicación:** Con REST.
- **Proteccion:** Por jsonwebtoken y bcrypt.
- **Respuestas:** Con el codigo de estado y mensaje descriptivo.
- **Documentacion:** Por Swagger.

#### Base de Datos

- **Tabla `user`**  
  Almacena la información de los usuarios registrados en el sistema.

  - `id` (`INTEGER`, clave primaria, autoincremental) – Identificador único del usuario.
  - `email` (`TEXT`, único, no nulo) – Correo electrónico del usuario.
  - `password` (`TEXT`, no nulo) – Contraseña encriptada del usuario.
  - `rol` (`TEXT`, no nulo) – Rol del usuario en el sistema (ejemplo: "admin", "usuario").
  - `office_id` (`INTEGER`, no nulo) – Identificador unico de la oficina en caso de ser admin.

- **Tabla `office`**  
  Almacena la información de las oficinas para comprobar que un admin si pertenece a una entidad.
  - `id` (`INTEGER`, clave primaria, autoincremental) – Identificador único de la oficina.

### **FastAPI**

- **Gestion de tareas por usuarios:** Crear, editar y eliminar tareas.
- **Almacenamiento:** Con base de datos SQLite3.
- **Comunicación:** Con REST.
- **Proteccion:** Por header API_KEY.
- **Respuestas:** Con el codigo de estado y mensaje descriptivo.
- **Documentacion:** Por Swagger.

#### Base de Datos

- **Tabla `task`**  
  Contiene las tareas creadas por los usuarios.

  - `id` (`INTEGER`, clave primaria, autoincremental) – Identificador único de la tarea.
  - `title` (`TEXT`, no nulo) – Título de la tarea.
  - `description` (`TEXT`, opcional) – Descripción detallada de la tarea.
  - `user_email` (`TEXT`, clave foránea) – Correo electrónico del usuario que creó la tarea.
  - `status` (`TEXT`, no nulo) – Estado de la tarea "pendiente", "en progreso", "completada".
  - `created` (`DATETIME`, no nulo) – Fecha y hora de creación de la tarea.

## Extra

Las bases de datos de Express y FastAPI son independientes y se utilizan según sus respectivas funcionalidades: Express maneja la autenticación de usuarios, mientras que FastAPI gestiona las tareas.

Para garantizar que una tarea solo pueda ser creada por un usuario registrado, FastAPI realizará una solicitud HTTP a Express para verificar en la tabla `user` si el `email` existe. Si el usuario es válido, la tarea se creará exitosamente.


## Autor

**Andrés Orozco**

- [GitHub](https://github.com/AndresOrozcoDev)
- [LinkedIn](https://www.linkedin.com/in/andresorozcodev/)

---