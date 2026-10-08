export interface Participante {
  _id?: string;
  id?: string | number;
  nome: string;
  email: string;

  // Fase 1 & 2
  eventoId?: any;

  // Fase 3 (NoSQL)
  idade?: number;
  cidade?: string;
  ingressoVip?: boolean;
  statusInscricao?: 'CONFIRMADO' | 'PENDENTE' | 'CANCELADO';
  eventosInscritos?: string[];
  telefone?: string;
}