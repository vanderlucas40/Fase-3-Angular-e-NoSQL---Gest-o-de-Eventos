package com.projeto.evento.services;

import com.projeto.evento.entities.Evento;
import com.projeto.evento.repositories.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    @Autowired
    private EventoRepository repository;

    public List<Evento> listarTodos() {
        return repository.findAll();
    }

    public Evento buscarPorId(Long id) {
        Optional<Evento> obj = repository.findById(id);
        return obj.orElse(null);
    }

    public Evento salvar(Evento evento) {
        return repository.save(evento);
    }

    public Evento atualizar(Long id, Evento dadosNovos) {
        Evento eventoExistente = buscarPorId(id);
        if (eventoExistente != null) {
            eventoExistente.setNome(dadosNovos.getNome());
            eventoExistente.setLocal(dadosNovos.getLocal());
            eventoExistente.setData(dadosNovos.getData());
            eventoExistente.setCapacidadeMaxima(dadosNovos.getCapacidadeMaxima());
            return repository.save(eventoExistente);
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