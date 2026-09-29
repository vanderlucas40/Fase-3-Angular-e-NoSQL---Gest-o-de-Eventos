# 🖥️ EventHub - Front-End de Gestão de Eventos

Uma Single Page Application (SPA) desenvolvida em **Angular** para gerenciamento de eventos e participantes, consumindo a API RESTful desenvolvida em Spring Boot na Fase 1.

Este projeto faz parte da **Fase 2** da atividade prática integrada (Front-end).

---

## 👥 Integrantes da Equipe

* **Leonardo de Aguiar Silva Ramalho** — Matrícula: `2515050011` — GitHub: [@leonardo](https://github.com/thatleonardo)
* **Vandemberg Lucas Lima Melo** — Matrícula: `2112090004` — GitHub: [@vanderlucas40](https://github.com/vanderlucas40)

---

## 📌 Sobre o Projeto e Arquitetura

O front-end foi estruturado utilizando a arquitetura de **Standalone Components** do Angular, garantindo separação clara de responsabilidades por pastas:

```text
src/app/
├── models/             # Interfaces TypeScript (DTOs/Entidades)
├── services/           # Serviços para integração HTTP com a API
└── components/         # Componentes de tela da aplicação
    ├── navbar/             # Barra de navegação
    ├── evento-list/        # Listagem e métricas de eventos
    ├── evento-form/        # Formulário de cadastro/edição de eventos
    ├── participante-list/  # Listagem de participantes inscritos
    └── participante-form/  # Formulário de cadastro com seleção de evento
```

## 🚀 Tecnologias Utilizadas

- **Linguagem:** TypeScript
- **Framework:** Angular (Standalone Components)
- **Gerenciador de Pacotes:** NPM
- **Estilização:** CSS3 puro
- **Comunicação HTTP:** `HttpClient` (REST / JSON)

---

## 📋 Entidades e Funcionalidades

### 1. Evento (`/eventos`)

- **Listagem:** Tabela com listagem dos eventos e métricas de capacidade alocada.
- **Cadastro:** Formulário para adicionar novos eventos (nome, local, data e capacidade).
- **Edição:** Atualização dos dados do evento via ID.
- **Exclusão:** Remoção de eventos com confirmação em tela.

### 2. Participante (`/participantes`)

- **Listagem:** Tabela exibindo os participantes e o nome do evento vinculado.
- **Cadastro:** Formulário de inscrição com seleção do evento cadastrado via `<select>`.
- **Edição:** Atualização de dados cadastrais.
- **Exclusão:** Remoção de inscrição de participantes.

---

## 🛣️ Rotas da Aplicação

| Rota | Componente | Descrição |
| :--- | :--- | :--- |
| `/eventos` | `EventoListComponent` | Listagem geral de eventos |
| `/eventos/novo` | `EventoFormComponent` | Cadastro de novo evento |
| `/eventos/editar/:id` | `EventoFormComponent` | Edição de evento existente |
| `/participantes` | `ParticipanteListComponent` | Listagem de inscritos |
| `/participantes/novo` | `ParticipanteFormComponent` | Inscrição de participante |
| `/participantes/editar/:id` | `ParticipanteFormComponent` | Edição de participante |
