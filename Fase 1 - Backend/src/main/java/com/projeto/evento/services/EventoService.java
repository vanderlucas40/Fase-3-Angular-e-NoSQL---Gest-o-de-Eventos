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

    // GET ALL
    public List<Evento> listarTodos() {
        return repository.findAll();
    }

    // GET BY ID
    public Evento buscarPorId(String id) {
        Optional<Evento> obj = repository.findById(id);
        return obj.orElse(null);
    }

    // POST
    public Evento salvar(Evento evento) {
        return repository.save(evento);
    }

    // PUT
    public Evento atualizar(String id, Evento dadosNovos) {
        Evento eventoExistente = buscarPorId(id);
        if (eventoExistente != null) {
            // Atualização dos campos de compatibilidade (Fase 1 e 2)
            eventoExistente.setNome(dadosNovos.getNome());
            eventoExistente.setLocal(dadosNovos.getLocal());
            eventoExistente.setData(dadosNovos.getData());
            eventoExistente.setCapacidadeMaxima(dadosNovos.getCapacidadeMaxima());

            // Atualização dos campos NoSQL (Fase 3)
            eventoExistente.setTitulo(dadosNovos.getTitulo());
            eventoExistente.setCategoria(dadosNovos.getCategoria());
            eventoExistente.setCapacidade(dadosNovos.getCapacidade());
            eventoExistente.setPrecoIngresso(dadosNovos.getPrecoIngresso());
            eventoExistente.setTags(dadosNovos.getTags());
            eventoExistente.setAtivo(dadosNovos.getAtivo());
            eventoExistente.setDescricao(dadosNovos.getDescricao());

            return repository.save(eventoExistente);
        }
        return null;
    }

    // DELETE
    public boolean deletar(String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    // FILTRO NoSQL ($gt e $lt)
    public List<Evento> buscarPorFaixaPreco(Double min, Double max) {
        return repository.findPorFaixaPreco(min, max);
    }

    // FILTRO NoSQL ($exists)
    public List<Evento> buscarComDescricao() {
        return repository.findComDescricao();
    }
}