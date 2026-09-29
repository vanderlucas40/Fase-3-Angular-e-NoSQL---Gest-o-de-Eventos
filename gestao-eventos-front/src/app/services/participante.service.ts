import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participante } from '../models/participante.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {

  private readonly API_URL = 'http://localhost:8080/participantes';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Participante[]> {
    return this.http.get<Participante[]>(this.API_URL);
  }

  buscarPorId(id: number): Observable<Participante> {
    return this.http.get<Participante>(`${this.API_URL}/${id}`);
  }

  salvar(participante: Participante): Observable<Participante> {
    return this.http.post<Participante>(this.API_URL, participante);
  }

  atualizar(id: number, participante: Participante): Observable<Participante> {
    return this.http.put<Participante>(`${this.API_URL}/${id}`, participante);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}