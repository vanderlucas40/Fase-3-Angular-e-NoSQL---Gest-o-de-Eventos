import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-evento-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './evento-list.html',
  styleUrls: ['./evento-list.css']
})
export class EventoListComponent implements OnInit {
  eventos: Evento[] = [];
  carregando: boolean = false;
  mensagemErro: string = '';

  precoMinimo: number | null = null;
  precoMaximo: number | null = null;

  constructor(
    private eventoService: EventoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos(): void {
    this.carregando = true;
    this.mensagemErro = '';
    
    this.eventoService.listar().subscribe({
      next: (dados) => {
        console.log('Eventos recebidos do backend:', dados);
        this.eventos = dados || [];
        this.carregando = false;
        this.cdr.detectChanges(); // Força a atualização do ecrã
      },
      error: (erro) => {
        console.error('Erro ao buscar eventos:', erro);
        this.mensagemErro = 'Não foi possível carregar os eventos do servidor.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  aplicarFiltroPreco(): void {
    if (this.precoMinimo === null || this.precoMaximo === null) {
      alert('Informe o valor mínimo e máximo.');
      return;
    }

    this.carregando = true;
    this.eventoService.filtrarPorFaixaPreco(this.precoMinimo, this.precoMaximo).subscribe({
      next: (dados) => {
        this.eventos = dados || [];
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao filtrar eventos:', erro);
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  limparFiltros(): void {
    this.precoMinimo = null;
    this.precoMaximo = null;
    this.carregarEventos();
  }

  excluirEvento(id?: string | number): void {
    if (!id) return;

    if (confirm('Deseja realmente remover este evento?')) {
      this.eventoService.remover(id).subscribe({
        next: () => {
          this.eventos = this.eventos.filter(e => (e.id ?? e._id) !== id);
          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.error('Erro ao excluir evento:', erro);
          alert('Erro ao excluir o evento.');
        }
      });
    }
  }
}