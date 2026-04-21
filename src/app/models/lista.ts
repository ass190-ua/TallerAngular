import { Tarea } from './tarea';

export class Lista {
  id: number;
  nombre: string;
  descripcion: string;
  color: string;
  fechaCreacion: Date;
  visible: boolean;
  tareas: Tarea[];

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