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

    public Participante buscarPorId(Long id) {
        Optional<Participante> obj = repository.findById(id);
        return obj.orElse(null);
    }

    public Participante salvar(Participante participante) {
        return repository.save(participante);
    }

    public Participante atualizar(Long id, Participante dadosNovos) {
        Participante participanteExistente = buscarPorId(id);
        if (participanteExistente != null) {
            participanteExistente.setNome(dadosNovos.getNome());
            participanteExistente.setEmail(dadosNovos.getEmail());
            participanteExistente.setEventoId(dadosNovos.getEventoId());
            return repository.save(participanteExistente);
        }
        return null;
    }

    public boolean deletar(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}