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

  constructor(private listaService: ListaService) {}

  // Función que se ejecutará al enviar el formulario
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

  // Función para borrar la lista del array
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

  // Función para obtener las listas filtradas
  getListasFiltradas() {
    if (this.filtroListas === 'visibles') {
      return this.listas.filter(l => l.visible);
    } else if (this.filtroListas === 'ocultas') {
      return this.listas.filter(l => !l.visible);
    }
    return this.listas; // 'todas'
  }
}