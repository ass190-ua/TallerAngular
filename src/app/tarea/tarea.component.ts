import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Tarea } from '../models/tarea';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  // Recibe la tarea individual a mostrar
  @Input() miTarea!: Tarea;
  // Emite un evento al padre cuando se hace clic en el botón de eliminar tarea
  @Output() eventoEliminar = new EventEmitter<Tarea>();
  // Emite un evento al padre cuando cambia el estado de la tarea (ej. al marcar como terminada)
  @Output() eventoCambio = new EventEmitter<Tarea>();

  constructor() { }

  ngOnInit(): void {
  }

  /** Emite el evento de eliminación para que el componente padre (ListaComponent) la borre */
  borrar() {
    this.eventoEliminar.emit(this.miTarea);
  }

  /** Avisa al componente padre que la tarea ha cambiado de estado (ej. terminada/no terminada) */
  cambiarEstado() {
    this.eventoCambio.emit(this.miTarea);
  }
}
