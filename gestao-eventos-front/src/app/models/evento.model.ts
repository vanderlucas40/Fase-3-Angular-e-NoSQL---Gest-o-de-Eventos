export interface Evento {
  _id?: string;
  id?: string | number;

  // Fase 1 & 2
  nome?: string;
  local?: string;
  data?: string | Date;
  capacidadeMaxima?: number;

  // Fase 3 (NoSQL)
  titulo?: string;
  categoria?: string;
  capacidade?: number;
  precoIngresso?: number;
  tags?: string[];
  ativo?: boolean;
  dataEvento?: string | Date;
  descricao?: string;
}