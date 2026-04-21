export class Tarea {
  nombre: string;
  descripcion: string;
  fechaFinalizacion: Date;
  visible: boolean;
  terminada: boolean;

  constructor() {
    this.nombre = "";
    this.descripcion = "";
    this.fechaFinalizacion = new Date();
    this.visible = true;
    this.terminada = false;
  }
}