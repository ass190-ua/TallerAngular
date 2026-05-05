import { Tarea } from './tarea';

/**
 * Modelo que representa una Lista de tareas.
 */
export class Lista {
  id: number;              // Identificador único de la lista (generado con Date.now())
  nombre: string;          // Título de la lista
  descripcion: string;     // Descripción detallada
  color: string;           // Color hexadecimal para la tarjeta (ej. #FFFFFF)
  fechaCreacion: Date;     // Fecha en la que se creó la lista
  visible: boolean;        // Estado que determina si la lista se muestra u oculta según los filtros
  tareas: Tarea[];         // Arreglo de tareas asociadas a esta lista

  constructor() {
    this.id = 0;
    this.nombre = "";
    this.descripcion = "";
    this.color = "#FFFFFF";
    this.fechaCreacion = new Date();
    this.visible = true;
    this.tareas = [];
  }
}