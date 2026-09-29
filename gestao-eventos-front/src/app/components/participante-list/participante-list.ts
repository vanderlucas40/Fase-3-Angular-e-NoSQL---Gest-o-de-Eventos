import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Participante } from '../../models/participante.model';
import { ParticipanteService } from '../../services/participante.service';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-participante-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './participante-list.html',
  styleUrl: './participante-list.css'
})
export class ParticipanteListComponent implements OnInit {

  participantes = signal<Participante[]>([]);
  totalInscritos = computed(() => this.participantes().length);
  eventosMap = signal<{ [key: number]: string }>({});

  constructor(
    private service: ParticipanteService,
    private eventoService: EventoService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.carregarDados();
    });
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.eventoService.listarTodos().subscribe({
      next: (eventos: Evento[]) => {
        const mapa: { [key: number]: string } = {};
        eventos.forEach(ev => {
          if (ev.id) mapa[ev.id] = ev.nome;
        });
        this.eventosMap.set(mapa);

        this.service.listarTodos().subscribe({
          next: (dados) => {
            this.participantes.set(dados);
          },
          error: () => alert('Erro ao listar participantes!')
        });
      }
    });
  }

  deletar(id?: number): void {
    if (!id) return;

    if (confirm('Deseja realmente remover este participante?')) {
      this.service.excluir(id).subscribe({
        next: () => {
          alert('Participante removido com sucesso!');
          this.carregarDados();
        },
        error: () => alert('Erro ao excluir participante.')
      });
    }
  }

  getNomeEvento(eventoId: number): string {
    return this.eventosMap()[eventoId] || `Evento #${eventoId}`;
  }
}