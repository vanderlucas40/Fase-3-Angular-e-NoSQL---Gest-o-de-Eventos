package com.projeto.evento.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.List;

@Document(collection = "eventos")
public class Evento {

    @Id
    private String id;

    // Campos do MongoDB
    private String titulo;
    private String categoria;
    private Integer capacidade;
    private Double precoIngresso;
    private List<String> tags;
    private Boolean ativo;
    private Object dataEvento; // Object aceita Date, String ou Timestamp sem dar erro 500
    private String descricao;

    // Campos adicionais de compatibilidade com a Fase 2 (não circulares)
    private String local;

    public Evento() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    // Compatibilidade com o front da Fase 2 (retorna titulo se nome for nulo)
    public String getNome() { return titulo; }
    public void setNome(String nome) { this.titulo = nome; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public Integer getCapacidade() { return capacidade; }
    public void setCapacidade(Integer capacidade) { this.capacidade = capacidade; }

    public Integer getCapacidadeMaxima() { return capacidade; }
    public void setCapacidadeMaxima(Integer capacidadeMaxima) { this.capacidade = capacidadeMaxima; }

    public Double getPrecoIngresso() { return precoIngresso; }
    public void setPrecoIngresso(Double precoIngresso) { this.precoIngresso = precoIngresso; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }

    public Object getDataEvento() { return dataEvento; }
    public void setDataEvento(Object dataEvento) { this.dataEvento = dataEvento; }

    public Object getData() { return dataEvento; }
    public void setData(Object data) { this.dataEvento = data; }

    public String getLocal() { return local; }
    public void setLocal(String local) { this.local = local; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
}