package com.projeto.evento.repositories;

import com.projeto.evento.entities.Evento;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventoRepository extends MongoRepository<Evento, String> {

    @Query("{ 'precoIngresso': { $gt: ?0, $lt: ?1 } }")
    List<Evento> findPorFaixaPreco(Double min, Double max);

    @Query("{ 'descricao': { $exists: true } }")
    List<Evento> findComDescricao();
}