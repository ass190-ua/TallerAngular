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

  getListas(): Observable<Lista[]> {
    return this.http.get<Lista[]>(this.apiUrl);
  }

  crearLista(lista: Lista): Observable<Lista> {
    return this.http.post<Lista>(this.apiUrl, lista);
  }

  actualizarLista(lista: Lista): Observable<Lista> {
    return this.http.put<Lista>(`${this.apiUrl}/${lista.id}`, lista);
  }

  eliminarLista(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
