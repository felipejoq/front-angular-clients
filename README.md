# ClientesApp

Este proyecto está generado con Angular CLI para la creación de la estructura base. La finalidad es generar un front-end para consumir una API RESTful creada con Spring Boot.

## Algunas Funciones:
+ Muestra lista de clientes paginados de 10 en 10 elementos.
+ Ver el perfil del usuario para editar sus atributos.
+ Edita la foto de perfil con loader y bloqueo de pantalla.
+ Elimina clientes individualmente.

### Funciones pendientes:
+ Buscador de usuarios con completado automático.
+ Crear, editar, ver detalles y borrar "Facturas" asociadas a cliente.
+ Proteger el acceso mediante roles, autorizaciones y autenticación.
+ ... etc.

____
[Angular CLI](https://github.com/angular/angular-cli) version 15.1.1.

## Development server

Para lanzar un servidor de desarrollo es necesario ejecutar el comando:
```bash
$ ng serve -o
```

## Code scaffolding

Para generar elementos o piezas del proyecto se puede hacer manualmente o usando Angular CLI de la siguiente forma:

Ejemplo: Generar un componente:
```bash
$ ng generate component component-name
```
Este comando tiene varias opciones, tales como:
```bash
$ ng generate directive|pipe|service|class|guard|interface|enum|module
```
## Further help

Para más ayuda sobre Angular CLI se usa el comando: `ng help` o consultar la Documentación Oficial: [Angular Documents](https://angular.io/docs).
