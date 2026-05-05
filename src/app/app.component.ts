import { Component, OnInit } from '@angular/core';
import { Lista } from './models/lista'; // <-- Importamos el modelo
import { ListaService } from './services/lista.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'appListas';
  msg = "Hola, bienvenido a mi proyecto en Angular";
  
  // Declaramos el array de listas
  listas: Lista[] = []; 

  // Objeto enlazado al formulario para la nueva lista
  nueva: Lista = new Lista();

  // Constructor: Inyectamos el servicio ListaService para manejar la persistencia
  constructor(private listaService: ListaService) {}

  /**
   * Crea una nueva lista: asigna ID y fecha de creación, la envía al servidor mediante el servicio,
   * la añade al array local y resetea el formulario. Muestra un mensaje de éxito durante 3 segundos.
   */
  guardarLista() {
    this.nueva.id = Date.now(); 
    this.nueva.fechaCreacion = new Date(); 

    this.listaService.crearLista(this.nueva).subscribe({
      next: (listaCreada) => {
        this.listas.push(listaCreada);
        this.nueva = new Lista(); 
        this.msg = "Lista creada correctamente";
        setTimeout(() => { this.msg = '' }, 3000);
      },
      error: (err) => console.error('Error al crear lista', err)
    });
  }

  /**
   * Elimina una lista: llama al servicio para borrarla en el servidor. Si tiene éxito,
   * la elimina del array local y muestra un mensaje durante 3 segundos.
   */
  borrarLista(listaABorrar: Lista) {
    this.listaService.eliminarLista(listaABorrar.id).subscribe({
      next: () => {
        const indice = this.listas.indexOf(listaABorrar);
        if (indice !== -1) {
          this.listas.splice(indice, 1);
        }
        this.msg = "Lista eliminada correctamente";
        setTimeout(() => { this.msg = '' }, 3000);
      },
      error: (err) => console.error('Error al eliminar lista', err)
    });
  }

  // Agregamos esta nueva función
  eliminar(listaParaBorrar: Lista) {
    // Filtramos el array 'listas', quedándonos solo con las que sean distintas a la que nos llega
    this.listas = this.listas.filter(l => l !== listaParaBorrar); 
    this.msg = "Lista eliminada correctamente";
    setTimeout(() => { this.msg = '' }, 3000);
  }

  /**
   * Carga inicial: al inicializar el componente, pide todas las listas al servidor
   * utilizando ListaService y las guarda en la variable local 'listas'.
   */
  ngOnInit(): void {
    setTimeout(() => { this.msg = '' }, 5000);

    this.listaService.getListas().subscribe({
      next: (data) => {
        this.listas = data;
      },
      error: (err) => console.error('Error al obtener listas', err)
    });
  }

  // Variable para el estado del filtro: 'todas', 'visibles' o 'ocultas'
  filtroListas: string = 'todas';

  /**
   * Filtra el array de listas según la opción seleccionada ('todas', 'visibles' u 'ocultas').
   * Retorna el array filtrado para ser renderizado en la plantilla mediante *ngFor.
   */
  getListasFiltradas() {
    if (this.filtroListas === 'visibles') {
      return this.listas.filter(l => l.visible);
    } else if (this.filtroListas === 'ocultas') {
      return this.listas.filter(l => !l.visible);
    }
    return this.listas; // 'todas'
  }
}