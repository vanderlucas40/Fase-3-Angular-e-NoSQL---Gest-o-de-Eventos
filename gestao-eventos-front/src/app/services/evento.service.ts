import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private readonly API_URL = 'http://localhost:8080/eventos';

  constructor(private http: HttpClient) {}

  // Métodos Fase 2 & Fase 3
  listar(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.API_URL);
  }

  listarTodos(): Observable<Evento[]> {
    return this.listar();
  }

  buscarPorId(id: string | number): Observable<Evento> {
    return this.http.get<Evento>(`${this.API_URL}/${id}`);
  }

  salvar(evento: Evento): Observable<Evento> {
    // Normaliza campos para o backend NoSQL se vierem da Fase 2
    const payload = {
      ...evento,
      titulo: evento.titulo || evento.nome || '',
      capacidade: evento.capacidade || evento.capacidadeMaxima || 0,
      dataEvento: evento.dataEvento || evento.data || new Date(),
      precoIngresso: evento.precoIngresso || 0,
      categoria: evento.categoria || 'Geral',
      tags: evento.tags || [],
      ativo: evento.ativo !== undefined ? evento.ativo : true
    };
    return this.http.post<Evento>(this.API_URL, payload);
  }

  atualizar(id: string | number, evento: Partial<Evento>): Observable<Evento> {
    return this.http.put<Evento>(`${this.API_URL}/${id}`, evento);
  }

  remover(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  // Consultas NoSQL com operadores ($gt, $lt,$exists)
  filtrarPorFaixaPreco(min: number, max: number): Observable<Evento[]> {
    const params = new HttpParams()
      .set('minPreco', min.toString())
      .set('maxPreco', max.toString());
    return this.http.get<Evento[]>(this.API_URL, { params });
  }

  filtrarPorCategoria(categoria: string): Observable<Evento[]> {
    const params = new HttpParams().set('categoria', categoria);
    return this.http.get<Evento[]>(this.API_URL, { params });
  }
}