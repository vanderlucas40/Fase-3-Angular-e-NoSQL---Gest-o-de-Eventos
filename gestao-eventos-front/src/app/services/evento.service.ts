import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private readonly API_URL = 'http://localhost:8080/eventos';

  constructor(private http: HttpClient) { }

  // GET ALL
  listarTodos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.API_URL);
  }

  // GET BY ID
  buscarPorId(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.API_URL}/${id}`);
  }

  // POST
  salvar(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.API_URL, evento);
  }

  // PUT
  atualizar(id: number, evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.API_URL}/${id}`, evento);
  }

  // DELETE
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}