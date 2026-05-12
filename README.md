# ICIFG003-EQ01

# Sistema de Gestión de Asistencia y Atrasos - Colegio Marcela Paz Concepción 
Este proyecto es una aplicación web integral diseñada para la gestión y control de asistencia, inasistencias y atrasos de los estudiantes. Desarrollado como parte de la asignatura Aplicaciones y Tecnologías de la Web en la Universidad San Sebastián.
-------------------------------------------------------------------------------------------------------------------------------------------
# Características Principales:

- Gestión de Estudiantes: Registro completo (CRUD) con validaciones de RUN único y restricción de caracteres alfabéticos en nombres.

- Módulo de Asistencia: Registro de inasistencias y atrasos con persistencia automática del curso según el contexto de navegación.

- Visualización de Datos: Tablas con ordenamiento cronológico descendente (lo más reciente primero).

- Portabilidad Total: Base de datos embebida que viaja con el proyecto.

- Interfaz Moderna: Dashboard intuitivo construido con Angular y Bootstrap.
-------------------------------------------------------------------------------------------------------------------------------------------
# Stack Tecnológico

### Backend:

- Java 17 & Spring Boot

- Spring Data JPA

- Base de Datos: H2 Database (Modo archivo para persistencia local)

- Gestión de dependencias: Maven

### Frontend:

- Angular 17+

- TypeScript

- Estado: Angular Signals & Store

- Estilos: Bootstrap 5 & Google Material Symbols
-------------------------------------------------------------------------------------------------------------------------------------------
# Instalación y Configuración:

### Pre-requisitos: 
- Java JDK 17 o superior.

- Node.js (versión 18+) y npm.

- Maven (o usar el wrapper ./mvnw incluido).

### Pasos para el Backend:

- Descarga la extensión de Spring tool en vs y enciende el backend.

- El servidor iniciará en http://localhost:8080.

### Pasos para el Frontend:

- Abre la terminal en un Command Prompt y navega a la carpeta raíz del frontend.

- Instala las dependencias:
>>>>>>>>>>>>
npm install
>>>>>>>>>>>>

- Inicia el servidor de desarrollo:
>>>>>>>>>
ng serve
>>>>>>>>>

- La aplicación estará disponible en http://localhost:4200.
-------------------------------------------------------------------------------------------------------------------------------------------
# Base de Datos y Persistencia

- El sistema utiliza H2 Database en modo archivo. Al iniciar la aplicación, se usa una carpeta llamada data/ en la raíz del backend con el archivo de la base de datos.

### Datos de Prueba:

- El proyecto incluye un script de carga automática (data.sql) que inicializa el sistema con:
--- 5 Cursos (1A a 5A).
--- 50 Estudiantes distribuidos en los cursos.
--- Registros base de inasistencias y atrasos para pruebas inmediatas.
-------------------------------------------------------------------------------------------------------------------------------------------
🛡️ Validaciones Implementadas
- RUN Único: El sistema impide el registro de dos estudiantes con el mismo RUN.

- Integridad de Nombres: Los campos de nombres y apellidos solo aceptan caracteres alfabéticos (Regex).

- Persistencia de Contexto: Al registrar un estudiante desde la vista de un curso específico, el formulario pre-selecciona automáticamente dicho curso mediante parámetros de ruta.
-------------------------------------------------------------------------------------------------------------------------------------------
👥 Autores
Benjamín Aedo - Estudiante de Ingeniería Civil Informática, USS.
Benjamín Campos - Estudiante de Ingeniería Civil Informática, USS.

Equipo ICIFG003-EQ01
