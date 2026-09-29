import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Evento } from '../../models/evento.model';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './evento-form.html',
  styleUrl: './evento-form.css'
})
export class EventoFormComponent implements OnInit {

  evento: Evento = {
    nome: '',
    local: '',
    data: '',
    capacidadeMaxima: 0
  };

  isEdicao: boolean = false;
  id?: number;

  constructor(
    private service: EventoService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef // <-- 1. Injetado aqui
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdicao = true;
      this.id = Number(idParam);
      this.service.buscarPorId(this.id).subscribe({
        next: (dados) => {
          this.evento = dados;
          this.cdr.detectChanges(); // <-- 2. Força o preenchimento imediato dos campos
        },
        error: () => alert('Não foi possível carregar os dados do evento.')
      });
    }
  }

  salvar(): void {
    if (this.isEdicao && this.id) {
      this.service.atualizar(this.id, this.evento).subscribe({
        next: () => {
          alert('Evento atualizado com sucesso!');
          this.router.navigate(['/eventos']);
        },
        error: () => alert('Erro ao atualizar o evento.')
      });
    } else {
      this.service.salvar(this.evento).subscribe({
        next: () => {
          alert('Evento cadastrado com sucesso!');
          this.router.navigate(['/eventos']);
        },
        error: () => alert('Erro ao cadastrar o evento.')
      });
    }
  }
}