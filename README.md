# Taller de Angular - App de Listas de Tareas

Este proyecto es una aplicación web en formato Single Page Application (SPA) desarrollada con **Angular**, diseñada para la gestión de listas de tareas. Ha sido creada como parte del Taller de Angular para la asignatura de **Gestión de la Calidad del Software (4º Grado en Ingeniería Informática)** de la Universidad de Alicante.

## Características Implementadas

Se han desarrollado todos los requisitos básicos solicitados en el taller, así como las tareas opcionales I y II.

### Gestión de Listas

- **Visualización en tarjetas:** Las listas se muestran usando componentes *Card* de Bootstrap, con el color de fondo personalizado según el elegido por el usuario.
- **Creación de listas:** Formulario para añadir nuevas listas con nombre, descripción y color.
- **Detalle de la lista:** Botón para mostrar u ocultar los detalles de una lista seleccionada (descripción y tareas).
- **Edición:** Posibilidad de modificar el nombre, la descripción y el color de una lista existente.
- **Borrado con confirmación:** Integración de diálogos modales mediante `ng-bootstrap` para solicitar confirmación antes de eliminar una lista definitivamente.
- **Modelado de datos avanzado:** La entidad `Lista` incluye atributos como identificador único, fecha de creación y visibilidad.

### Gestión de Tareas (Detalle de la lista)

- **Componente dedicado:** Se ha creado un componente independiente (`TareaComponent`) que encapsula toda la lógica visual y de interacción de una tarea individual.
- **Añadir y eliminar:** Capacidad de registrar nuevas tareas y eliminar las existentes dentro de cada lista.
- **Control de estado:** Permite marcar una tarea como 'terminada' o 'pendiente'.
- **Filtros de visualización:** Sistema de filtrado en el detalle de la lista para mostrar las tareas según su estado: *Todas*, *Acabadas* o *Pendientes*.

### Arquitectura y Tecnologías

- **Angular 17:** Uso de componentes, directivas estructurales y flujos de control.
- **Comunicación entre componentes:** Uso intensivo de decoradores `@Input()` y `@Output()` (con `EventEmitter`) para la comunicación entre componentes padres e hijos (`AppComponent`, `ListaComponent` y `TareaComponent`).
- **Servicios y HTTP:** Implementación de `ListaService` (inyectado en los componentes) para gestionar el CRUD de listas mediante peticiones HTTP.
- **Backend Simulado:** Uso de `json-server` para simular una API REST utilizando el archivo `db.json`.
- **Estilos y UI:** Integración de **Bootstrap** y **ng-bootstrap** para la maquetación responsive y componentes interactivos (modales, alertas).

## Instalación y Ejecución

Sigue estos pasos para probar la aplicación en tu entorno local:

### 1. Clonar el repositorio y acceder al directorio

```bash
git clone https://github.com/ass190-ua/TallerAngular
cd TallerAngular
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Arrancar el servidor de base de datos (Backend simulado)

```bash
npm run server
```

Esto levantará `json-server` en el puerto **3000**.

### 4. Arrancar la aplicación Angular

```bash
npm start
```

### 5. Abrir en el navegador

http://localhost:4200/

---

## Autores

- [**@ass190-ua**](https://github.com/ass190-ua) | Arturo Soriano Sánchez
- [**@eps63-ua**](https://github.com/Eps63-ua)   | Esther Peral Soler