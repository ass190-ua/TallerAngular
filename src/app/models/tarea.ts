/**
 * Modelo que representa una Tarea individual dentro de una lista.
 */
export class Tarea {
  nombre: string;              // Nombre o título corto de la tarea
  descripcion: string;         // Información adicional sobre lo que hay que hacer
  fechaFinalizacion: Date;     // Fecha límite o prevista para finalizar (por defecto, la fecha de creación)
  visible: boolean;            // Indica si la tarea es visible (no se usa extensivamente, pero disponible para filtros)
  terminada: boolean;          // Estado principal: indica si la tarea ya fue completada (true) o sigue pendiente (false)

  constructor() {
    this.nombre = "";
    this.descripcion = "";
    this.fechaFinalizacion = new Date();
    this.visible = true;
    this.terminada = false;
  }
}