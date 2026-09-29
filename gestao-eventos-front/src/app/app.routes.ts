import { Routes } from '@angular/router';
import { EventoListComponent } from './components/evento-list/evento-list';
import { EventoFormComponent } from './components/evento-form/evento-form';
import { ParticipanteListComponent } from './components/participante-list/participante-list';
import { ParticipanteFormComponent } from './components/participante-form/participante-form';

export const routes: Routes = [
  { path: '', redirectTo: 'eventos', pathMatch: 'full' },
  { path: 'eventos', component: EventoListComponent },
  { path: 'eventos/novo', component: EventoFormComponent },
  { path: 'eventos/editar/:id', component: EventoFormComponent },
  
  // Rotas de Participantes
  { path: 'participantes', component: ParticipanteListComponent },
  { path: 'participantes/novo', component: ParticipanteFormComponent },
  { path: 'participantes/editar/:id', component: ParticipanteFormComponent }
];