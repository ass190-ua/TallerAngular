import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Tarea } from '../models/tarea';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  @Input() miTarea!: Tarea;
  @Output() eventoEliminar = new EventEmitter<Tarea>();
  @Output() eventoCambio = new EventEmitter<Tarea>();

  constructor() { }

  ngOnInit(): void {
  }

  borrar() {
    this.eventoEliminar.emit(this.miTarea);
  }

  cambiarEstado() {
    this.eventoCambio.emit(this.miTarea);
  }
}
