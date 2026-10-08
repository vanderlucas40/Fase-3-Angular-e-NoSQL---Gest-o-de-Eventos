import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Participante } from '../../models/participante.model';
import { ParticipanteService } from '../../services/participante.service';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-participante-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './participante-form.html',
  styleUrl: './participante-form.css'
})
export class ParticipanteFormComponent implements OnInit {

  participante: Participante = {
    nome: '',
    email: '',
    eventoId: ''
  };

  eventosDisponiveis: Evento[] = [];
  isEdicao: boolean = false;
  id?: string;

  constructor(
    private service: ParticipanteService,
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // 1. Carrega a lista de eventos para popular o select
    this.eventoService.listarTodos().subscribe({
      next: (eventos) => {
        this.eventosDisponiveis = eventos;

        // Se veio evento pré-selecionado na query string (?eventoId=...)
        const queryEventoId = this.route.snapshot.queryParamMap.get('eventoId');
        if (queryEventoId) {
          this.participante.eventoId = queryEventoId;
        } else if (this.eventosDisponiveis.length > 0 && !this.participante.eventoId) {
          this.participante.eventoId = (this.eventosDisponiveis[0].id ?? this.eventosDisponiveis[0]._id)?.toString();
        }

        // 2. Verifica se a rota é de edição (/participantes/editar/:id)
        const idParam = this.route.snapshot.paramMap.get('id');
        
        // Garante que só busca no backend se o ID existir e NÃO for nulo, indefinido ou 'NaN'
        if (idParam && idParam !== 'NaN' && idParam !== 'novo') {
          this.isEdicao = true;
          this.id = idParam;

          this.service.buscarPorId(this.id).subscribe({
            next: (dados) => {
              this.participante = dados;
              this.cdr.detectChanges();
            },
            error: (err) => {
              console.error('Erro ao buscar dados do participante:', err);
              this.cdr.detectChanges();
            }
          });
        } else {
          this.isEdicao = false;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Erro ao carregar eventos:', err);
      }
    });
  }

  salvar(): void {
    if (this.isEdicao && this.id) {
      this.service.atualizar(this.id, this.participante).subscribe({
        next: () => {
          alert('Participante atualizado com sucesso!');
          this.router.navigate(['/participantes']);
        },
        error: () => alert('Erro ao atualizar participante.')
      });
    } else {
      this.service.salvar(this.participante).subscribe({
        next: () => {
          alert('Participante cadastrado com sucesso!');
          this.router.navigate(['/participantes']);
        },
        error: () => alert('Erro ao cadastrar participante.')
      });
    }
  }
}