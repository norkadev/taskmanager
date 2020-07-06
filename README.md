# Task Manager Web App
Aplicación web para gestionar tareas.

## Comenzando 🚀
El proyecto está compuesto por dos carpetas a saber:

**task-manager-frontend** Contiene un proyecto Angular v.8, que como su nombre lo indica, representa el front end de la app.
Al desplegar, acceder desde el navegador a la url http://localhost:4200.

**task-manager-backend** Contiene un proyecto NodeJs, que como su nombre indica, representa el back end de la aplicación, en este caso un API Rest.
Se conecta a mongodb, los detalles de la conexión se encuentran en el archivo .env (**Nota**: Por seguridad, este archivo no debe ser subido al repositorio cuando se 
está trabajando con una base de datos en un servidor dedicado).

El proceso de autenticación del usuario se realizó de acuerdo con el JSON Web Token estandard, el token es compartido en la cabecera de esta manera:

**X-JWT-TOKEN:VALUE**

---
⌨️ con ❤️ por Norka Rodríguez 😊
