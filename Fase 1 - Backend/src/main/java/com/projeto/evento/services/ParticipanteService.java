package com.projeto.evento.services;

import com.projeto.evento.entities.Participante;
import com.projeto.evento.repositories.ParticipanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParticipanteService {

    @Autowired
    private ParticipanteRepository repository;

    public List<Participante> listarTodos() {
        return repository.findAll();
    }

    public Participante buscarPorId(String id) {
        Optional<Participante> obj = repository.findById(id);
        return obj.orElse(null);
    }

    public Participante salvar(Participante participante) {
        return repository.save(participante);
    }

    public Participante atualizar(String id, Participante dadosNovos) {
        Participante existente = buscarPorId(id);
        if (existente != null) {
            existente.setNome(dadosNovos.getNome());
            existente.setEmail(dadosNovos.getEmail());
            existente.setEventoId(dadosNovos.getEventoId());
            existente.setIdade(dadosNovos.getIdade());
            existente.setCidade(dadosNovos.getCidade());
            existente.setIngressoVip(dadosNovos.getIngressoVip());
            existente.setStatusInscricao(dadosNovos.getStatusInscricao());
            existente.setEventosInscritos(dadosNovos.getEventosInscritos());
            existente.setTelefone(dadosNovos.getTelefone());
            return repository.save(existente);
        }
        return null;
    }

    public boolean deletar(String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}