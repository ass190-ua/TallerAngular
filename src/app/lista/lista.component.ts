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
  // Recibe la lista a gestionar desde el padre (AppComponent)
  @Input() miLista!: Lista; 
  // Emite un evento al padre cuando el usuario quiere eliminar esta lista
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

  /** Invierte el estado de mostrarDetalles para mostrar u ocultar la información adicional y las tareas */
  toggleDetalles() {
    this.mostrarDetalles = !this.mostrarDetalles;
  }

  /**
   * Cambia el estado 'editando'. Al entrar en edición se muestran los detalles.
   * Al salir de edición, se guardan los cambios realizados en el servidor.
   */
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

  /** Persiste los cambios de la lista actual en el servidor haciendo una petición PUT al servicio */
  actualizarEnServidor() {
    this.listaService.actualizarLista(this.miLista).subscribe({
      error: (err) => console.error('Error al actualizar la lista', err)
    });
  }

  // Funciones de eliminación

  /** Emite la señal de eliminación al componente padre */
  borrar() {
    this.eventoEliminar.emit(this.miLista); 
  }

  /** Muestra un modal de confirmación. Si el usuario confirma, llama a borrar() */
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

  /** Añade una tarea nueva a la lista actual si el nombre no está vacío y luego actualiza en el servidor */
  agregarTarea() {
    if (this.nuevaTarea.nombre.trim() !== '') {
      this.miLista.tareas.push(this.nuevaTarea);
      this.nuevaTarea = new Tarea(); // Limpiamos el formulario
      this.actualizarEnServidor();
    }
  }

  /** Localiza la tarea dada en el array y la elimina, luego guarda los cambios en el servidor */
  borrarTarea(tareaABorrar: Tarea) {
    const indice = this.miLista.tareas.indexOf(tareaABorrar);
    if (indice !== -1) {
      this.miLista.tareas.splice(indice, 1);
      this.actualizarEnServidor();
    }
  }

  filtroTareas: string = 'todas';

  /** Filtra las tareas de la lista según su estado y el filtro seleccionado */
  getTareasFiltradas() {
    if (this.filtroTareas === 'acabadas') return this.miLista.tareas.filter(t => t.terminada);
    if (this.filtroTareas === 'pendientes') return this.miLista.tareas.filter(t => !t.terminada);
    return this.miLista.tareas;
  }
}