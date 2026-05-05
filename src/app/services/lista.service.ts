import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lista } from '../models/lista';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private apiUrl = 'http://localhost:3000/listas';

  constructor(private http: HttpClient) { }

  /** Obtiene el arreglo de listas desde el servidor (petición GET) */
  getListas(): Observable<Lista[]> {
    return this.http.get<Lista[]>(this.apiUrl);
  }

  /** Envía una nueva lista al servidor para que la guarde (petición POST) */
  crearLista(lista: Lista): Observable<Lista> {
    return this.http.post<Lista>(this.apiUrl, lista);
  }

  /** Envía la lista modificada al servidor para sobreescribir la anterior (petición PUT) */
  actualizarLista(lista: Lista): Observable<Lista> {
    return this.http.put<Lista>(`${this.apiUrl}/${lista.id}`, lista);
  }

  /** Pide al servidor que elimine la lista que coincida con el id dado (petición DELETE) */
  eliminarLista(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
