/* ==========================================================================
   FASE 3 - CONSULTAS NOSQL (MONGODB)
   SISTEMA DE GESTÃO DE EVENTOS
   
   INTEGRANTES:
   - Leonardo de Aguiar Silva Ramalho** — Matrícula: `2515050011` — GitHub: [@leonardo](https://github.com/thatleonardo)
   - Vandemberg Lucas Lima Melo** — Matrícula: `2112090004` — GitHub: [@vanderlucas40](https://github.com/vanderlucas40)
   ========================================================================== */

use('eventos_db');

// Limpeza prévia para garantir testes reproduzíveis
db.eventos.drop();
db.participantes.drop();

// ==========================================================================
// ENTIDADE 1: EVENTOS (9 Operadores)
// Operadores: insertOne, insertMany, find(), find({attr: val}), updateOne,
//             deleteOne, $gt, $lt, $exists
// ==========================================================================

// 1. insertOne: Insere um evento unitário
db.eventos.insertOne({
  titulo: "Tech Summit Nordeste",
  categoria: "Tecnologia",
  capacidade: 500,
  precoIngresso: 150.00,
  tags: ["angular", "nosql", "cloud"],
  ativo: true,
  dataEvento: new Date("2026-11-20T09:00:00Z"),
  descricao: "Maior conferência de tecnologia e desenvolvimento web da região."
});

// 2. insertMany: Insere múltiplos eventos em lote
db.eventos.insertMany([
  {
    titulo: "Workshop Angular na Prática",
    categoria: "Tecnologia",
    capacidade: 40,
    precoIngresso: 80.00,
    tags: ["angular", "frontend", "web"],
    ativo: true,
    dataEvento: new Date("2026-10-15T14:00:00Z"),
    descricao: "Imersão prática com componentes e serviços."
  },
  {
    titulo: "Festival Gastronômico Regional",
    categoria: "Gastronomia",
    capacidade: 1200,
    precoIngresso: 30.00,
    tags: ["culinaria", "cultura"],
    ativo: false,
    dataEvento: new Date("2026-12-05T18:00:00Z")
    // Propositalmente sem o campo 'descricao' para testar $exists
  },
  {
    titulo: "Congresso de Gestão & Inovação",
    categoria: "Negócios",
    capacidade: 350,
    precoIngresso: 220.00,
    tags: ["gestao", "lideranca", "agile"],
    ativo: true,
    dataEvento: new Date("2026-11-28T08:30:00Z"),
    descricao: "Painéis executivos com líderes de mercado."
  }
]);

// 3. find(): Retorna todos os eventos
db.eventos.find();

// 4. find({atributo: "valor"}): Filtra por categoria exata
db.eventos.find({ categoria: "Tecnologia" });

// 5. updateOne: Atualiza capacidade e valor de um evento
db.eventos.updateOne(
  { titulo: "Tech Summit Nordeste" },
  { $set: { capacidade: 600, precoIngresso: 160.00 } }
);

// 6. deleteOne: Remove um evento inativo
db.eventos.deleteOne({ titulo: "Festival Gastronômico Regional" });

// 7 e 8. $gt e $lt: Busca por faixa de preço (entre R$ 50 e R$ 200)
db.eventos.find({
  precoIngresso: { $gt: 50.00, $lt: 200.00 }
});

// 9. $exists: Retorna apenas eventos que possuem o campo 'descricao'
db.eventos.find({
  descricao: { $exists: true }
});


// ==========================================================================
// ENTIDADE 2: PARTICIPANTES (8 Operadores)
// Operadores: $eq, $ne, $gte, $lte, $in, $nin, $or, $and
// ==========================================================================

// Carga de dados para participantes
db.participantes.insertMany([
  {
    nome: "Lucas Lima",
    email: "lucas@email.com",
    idade: 26,
    cidade: "Campina Grande",
    ingressoVip: true,
    statusInscricao: "CONFIRMADO",
    eventosInscritos: ["Tech Summit Nordeste"],
    telefone: "83988887777"
  },
  {
    nome: "Mariana Costa",
    email: "mariana@email.com",
    idade: 17,
    cidade: "João Pessoa",
    ingressoVip: false,
    statusInscricao: "PENDENTE",
    eventosInscritos: []
  },
  {
    nome: "Carlos Eduardo",
    email: "carlos@email.com",
    idade: 42,
    cidade: "Recife",
    ingressoVip: true,
    statusInscricao: "CONFIRMADO",
    eventosInscritos: ["Congresso de Gestão & Inovação"]
  },
  {
    nome: "Beatriz Santos",
    email: "beatriz@email.com",
    idade: 21,
    cidade: "Campina Grande",
    ingressoVip: false,
    statusInscricao: "CANCELADO",
    eventosInscritos: []
  },
  {
    nome: "Rafael Albuquerque",
    email: "rafael@email.com",
    idade: 35,
    cidade: "Natal",
    ingressoVip: false,
    statusInscricao: "CONFIRMADO",
    eventosInscritos: ["Tech Summit Nordeste"]
  }
]);

// 10. $eq: Participantes com status estritamente CONFIRMADO
db.participantes.find({
  statusInscricao: { $eq: "CONFIRMADO" }
});

// 11. $ne: Participantes cuja cidade NÃO é Campina Grande
db.participantes.find({
  cidade: { $ne: "Campina Grande" }
});

// 12 e 13. $gte e $lte: Faixa etária entre 18 e 35 anos (inclusive)
db.participantes.find({
  idade: { $gte: 18, $lte: 35 }
});

// 14. $in: Participantes que moram em cidades selecionadas
db.participantes.find({
  cidade: { $in: ["Campina Grande", "João Pessoa", "Recife"] }
});

// 15. $nin: Participantes cujo status NÃO seja CANCELADO nem PENDENTE
db.participantes.find({
  statusInscricao: { $nin: ["CANCELADO", "PENDENTE"] }
});

// 16. $and: Participantes que são VIP E estão confirmados
db.participantes.find({
  $and: [
    { ingressoVip: true },
    { statusInscricao: "CONFIRMADO" }
  ]
});

// 17. $or: Participantes menores de idade OU residentes em Recife
db.participantes.find({
  $or: [
    { idade: { $lt: 18 } },
    { cidade: "Recife" }
  ]
});