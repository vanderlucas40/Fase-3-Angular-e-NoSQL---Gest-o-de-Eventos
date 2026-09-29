import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Evento } from '../../models/evento.model';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-evento-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './evento-list.html',
  styleUrl: './evento-list.css'
})
export class EventoListComponent implements OnInit {

  // Signals nativos do Angular
  eventos = signal<Evento[]>([]);
  totalEventos = computed(() => this.eventos().length);
  totalCapacidade = computed(() => 
    this.eventos().reduce((acc, ev) => acc + (Number(ev.capacidadeMaxima) || 0), 0)
  );

  constructor(
    private service: EventoService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.carregarEventos();
    });
  }

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos(): void {
    this.service.listarTodos().subscribe({
      next: (dados) => {
        // Ao atualizar o Signal com .set(), o Angular atualiza TODOS os lugares da tela instantaneamente!
        this.eventos.set(dados);
      },
      error: () => alert('Erro ao buscar eventos da API!')
    });
  }

  deletar(id?: number): void {
    if (!id) return;

    if (confirm('Deseja realmente excluir este evento?')) {
      this.service.excluir(id).subscribe({
        next: () => {
          alert('Evento removido com sucesso!');
          this.carregarEventos();
        },
        error: () => alert('Erro ao excluir evento.')
      });
    }
  }
}