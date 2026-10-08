# 🍃 EventHub - Sistema de Gestão de Eventos (Full Stack & NoSQL)

Uma solução completa de gerenciamento de eventos e participantes composta por um front-end SPA em **Angular 19**, integrado a uma API RESTful em **Spring Boot 3 (Java 21)** conectada nativamente ao banco de dados orientados a documentos **MongoDB**.

Este projeto compreende a entrega da **Fase 3** da atividade prática integrada (Persistência NoSQL, Spring Data MongoDB e Integração Full Stack).

## 👥 Integrantes da Equipe

* **Leonardo de Aguiar Silva Ramalho** — Matrícula: `2515050011` — GitHub: [@leonardo](https://github.com/thatleonardo)

* **Vandemberg Lucas Lima Melo** — Matrícula: `2112090004` — GitHub: [@vanderlucas40](https://github.com/vanderlucas40)

## 📌 Sobre o Projeto e Arquitetura

O projeto foi unificado para integrar ponta a ponta as camadas de persistência não-relacional, regras de negócio e interface com o usuário:

```
gestao-eventos-front-fase2/
├── Fase 1 - Backend/                 # API RESTful Spring Boot 3.3.4 (Java 21)
│   ├── src/main/java/com/projeto/evento/
│   │   ├── controllers/              # Endpoints REST (CORS habilitado)
│   │   ├── entities/                 # Entidades Document (@Document do MongoDB)
│   │   ├── repositories/             # MongoRepository com queries customizadas
│   │   └── services/                 # Regras de negócio e operações CRUD
│   └── src/main/resources/           # application.properties (Conexão MongoDB)
│
├── gestao-eventos-front/             # Front-end SPA em Angular 19
│   └── src/app/
│       ├── models/                   # Interfaces TypeScript tipadas com IDs em String
│       ├── services/                 # Integração HTTP direta com o Spring Boot (:8080)
│       └── components/               # Componentes Standalone (listagem, filtros e formulários)
│
└── gestao-eventos-api/
    └── fase3_consultas_nosql.js      # Script automatizado com as consultas dos 17 operadores NoSQL

```

## 🚀 Tecnologias Utilizadas

### Back-End & Persistência

* **Linguagem:** Java 21 (LTS)

* **Framework:** Spring Boot 3.3.4

* **Módulo de Dados:** Spring Data MongoDB (`spring-boot-starter-data-mongodb`)

* **Banco de Dados:** MongoDB Community Server (Porta `27017` / Database: `eventos_db`)

* **Gerenciador de Dependências:** Apache Maven

### Front-End

* **Framework:** Angular 19 (Standalone Components & Signals/Change Detection)

* **Linguagem:** TypeScript

* **Estilização:** CSS3 puro e design responsivo

* **Comunicação HTTP:** `HttpClient` e RxJS

## 📋 Entidades e Funcionalidades

### 1. Evento (`/eventos`)

* **Coleção MongoDB:** `eventos`

* **Campos Principais:** `id` (ObjectId/String), `titulo` / `nome`, `categoria`, `capacidade`, `precoIngresso`, `tags` (Array), `ativo` (Boolean), `dataEvento` e `descricao`.

* **Funcionalidades da Interface:**

  * Listagem reativa dos eventos cadastrados no MongoDB.

  * Filtro por faixa de preço utilizando operadores `$gt` e `$lt`.

  * Exclusão e atalho rápido para inscrição direta de participantes no card do evento.

### 2. Participante (`/participantes`)

* **Coleção MongoDB:** `participantes`

* **Campos Principais:** `id` (ObjectId/String), `nome`, `email`, `eventoId`, `idade`, `cidade`, `ingressoVip`, `statusInscricao`, `eventosInscritos` e `telefone`.

* **Funcionalidades da Interface:**

  * Listagem com relacionamento de evento resolvido em tempo de execução.

  * Formulário dinâmico de cadastro com seleção de evento via `<select>`.

  * Edição de dados cadastrais suportando chaves hexadecimais de 24 caracteres do MongoDB.

  * Exclusão de inscrições com sincronização em tempo real.

## 🔍 Operadores NoSQL Implementados (Fase 3)

O script `fase3_consultas_nosql.js` cobre os 17 operadores solicitados distribuídos entre as entidades:

| 

| **Operador** | **Coleção / Alvo** | **Finalidade** | 
| `insertOne` | `eventos` | Cadastro unitário de documento | 
| `insertMany` | `eventos` | Inserção de lote de eventos com tags e categorias | 
| `find` | `eventos` | Consulta geral e com filtros exatos | 
| `updateOne` | `eventos` | Atualização atômica de valores e tags (`$set`) | 
| `deleteOne` | `eventos` | Remoção de documento específico | 
| `$gt` e `$lt` | `eventos` | Filtro por faixa de preço de ingressos | 
| `$exists` | `eventos` | Busca de eventos que contêm o campo opcional `descricao` | 
| `$eq` e `$ne` | `participantes` | Filtro por status de inscrição igual ou diferente | 
| `$gte` e `$lte` | `participantes` | Filtro por intervalo de faixa etária | 
| `$in` e `$nin` | `participantes` | Verificação de participantes por listas de cidades | 
| `$and` e `$or` | `participantes` | Combinações lógicas de participantes VIPs e confirmados | 

## 🛣️ Rotas da Aplicação (Front-End)

| **Rota** | **Componente** | **Descrição** | 
| `/eventos` | `EventoListComponent` | Painel de eventos com filtros NoSQL e listagem | 
| `/eventos/novo` | `EventoFormComponent` | Formulário de criação de novos eventos | 
| `/eventos/editar/:id` | `EventoFormComponent` | Edição de evento com ID do MongoDB | 
| `/participantes` | `ParticipanteListComponent` | Tabela de participantes vinculados | 
| `/participantes/novo` | `ParticipanteFormComponent` | Inscrição de participantes em eventos | 
| `/participantes/editar/:id` | `ParticipanteFormComponent` | Edição cadastral de participantes | 



