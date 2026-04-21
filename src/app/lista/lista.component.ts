import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { Lista } from '../models/lista';
import { Tarea } from '../models/tarea';
import { ListaService } from '../services/lista.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  encapsulation: ViewEncapsulation.None // Solicitado por el apunte para modales complejos
})
export class ListaComponent implements OnInit {

  // Entradas y Salidas
  @Input() miLista!: Lista; 
  @Output() eventoEliminar = new EventEmitter<Lista>();
  
  // Variables de estado
  mostrarDetalles: boolean = false;
  editando: boolean = false;
  nuevaTarea: Tarea = new Tarea();

  // Constructor (Inyectamos el servicio del Modal y ListaService)
  constructor(private modalService: NgbModal, private listaService: ListaService) { }

  ngOnInit(): void {
  }

  // Funciones de estado de la tarjeta

  toggleDetalles() {
    this.mostrarDetalles = !this.mostrarDetalles;
  }

  toggleEdicion() {
    this.editando = !this.editando;
    // Si entramos en edición, abrimos los detalles para que el usuario vea todo
    if (this.editando) {
      this.mostrarDetalles = true;
    } else {
      // Si salimos de edición, guardamos los cambios en el servidor
      this.actualizarEnServidor();
    }
  }

  actualizarEnServidor() {
    this.listaService.actualizarLista(this.miLista).subscribe({
      error: (err) => console.error('Error al actualizar la lista', err)
    });
  }

  // Funciones de eliminación

  borrar() {
    this.eventoEliminar.emit(this.miLista); 
  }

  abrirModalConfirmacion(contenidoModal: any) {
    this.modalService.open(contenidoModal, { centered: true }).result.then(
      (resultado) => {
        // Si el usuario hace clic en el botón de confirmar
        if (resultado === 'Aceptar') {
          this.borrar(); 
        }
      }, 
      (cancelado) => {
        // Si cierra el modal sin aceptar, no hacemos nada
      }
    );
  }

  // Funciones de Gestion de tareas

  agregarTarea() {
    if (this.nuevaTarea.nombre.trim() !== '') {
      this.miLista.tareas.push(this.nuevaTarea);
      this.nuevaTarea = new Tarea(); // Limpiamos el formulario
      this.actualizarEnServidor();
    }
  }

  borrarTarea(tareaABorrar: Tarea) {
    const indice = this.miLista.tareas.indexOf(tareaABorrar);
    if (indice !== -1) {
      this.miLista.tareas.splice(indice, 1);
      this.actualizarEnServidor();
    }
  }

  filtroTareas: string = 'todas';

  getTareasFiltradas() {
    if (this.filtroTareas === 'acabadas') return this.miLista.tareas.filter(t => t.terminada);
    if (this.filtroTareas === 'pendientes') return this.miLista.tareas.filter(t => !t.terminada);
    return this.miLista.tareas;
  }
}