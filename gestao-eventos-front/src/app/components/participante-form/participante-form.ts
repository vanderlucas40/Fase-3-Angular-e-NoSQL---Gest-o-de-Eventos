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
    eventoId: 0
  };

  eventosDisponiveis: Evento[] = [];
  isEdicao: boolean = false;
  id?: number;

  constructor(
    private service: ParticipanteService,
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // 1. Carrega os eventos para preencher as opções do <select>
    this.eventoService.listarTodos().subscribe({
      next: (eventos) => {
        this.eventosDisponiveis = eventos;
        if (this.eventosDisponiveis.length > 0 && !this.participante.eventoId) {
          this.participante.eventoId = this.eventosDisponiveis[0].id!;
        }

        // 2. Se for edição, carrega os dados do participante
        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
          this.isEdicao = true;
          this.id = Number(idParam);
          this.service.buscarPorId(this.id).subscribe({
            next: (dados) => {
              this.participante = dados;
              this.cdr.detectChanges();
            }
          });
        } else {
          this.cdr.detectChanges();
        }
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