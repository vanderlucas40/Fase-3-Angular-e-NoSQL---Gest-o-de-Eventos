package com.projeto.evento.repositories;

import com.projeto.evento.entities.Participante;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipanteRepository extends MongoRepository<Participante, String> {

    // $gte e $lte
    @Query("{ 'idade': { $gte: ?0, $lte: ?1 } }")
    List<Participante> findPorFaixaEtaria(Integer min, Integer max);

    // $in
    @Query("{ 'cidade': { $in: ?0 } }")
    List<Participante> findPorCidades(List<String> cidades);

    // $and
    @Query("{ $and: [ { 'ingressoVip': true }, { 'statusInscricao': 'CONFIRMADO' } ] }")
    List<Participante> findVipsConfirmados();
}