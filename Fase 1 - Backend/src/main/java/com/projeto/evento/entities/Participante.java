package com.projeto.evento.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "participantes")
public class Participante {

    @Id
    private String id;
    private String nome;
    private String email;

    // Fase 2
    private String eventoId;

    // Fase 3 (NoSQL)
    private Integer idade;
    private String cidade;
    private Boolean ingressoVip;
    private String statusInscricao; // 'CONFIRMADO', 'PENDENTE', 'CANCELADO'
    private List<String> eventosInscritos;
    private String telefone; // Opcional ($exists)

    public Participante() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getEventoId() { return eventoId; }
    public void setEventoId(String eventoId) { this.eventoId = eventoId; }

    public Integer getIdade() { return idade; }
    public void setIdade(Integer idade) { this.idade = idade; }

    public String getCidade() { return cidade; }
    public void setCidade(String cidade) { this.cidade = cidade; }

    public Boolean getIngressoVip() { return ingressoVip; }
    public void setIngressoVip(Boolean ingressoVip) { this.ingressoVip = ingressoVip; }

    public String getStatusInscricao() { return statusInscricao; }
    public void setStatusInscricao(String statusInscricao) { this.statusInscricao = statusInscricao; }

    public List<String> getEventosInscritos() { return eventosInscritos; }
    public void setEventosInscritos(List<String> eventosInscritos) { this.eventosInscritos = eventosInscritos; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
}