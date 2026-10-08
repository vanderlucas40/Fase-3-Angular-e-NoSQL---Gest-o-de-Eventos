package com.projeto.evento.controllers;

import com.projeto.evento.entities.Evento;
import com.projeto.evento.services.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/eventos")
@CrossOrigin(origins = "*")
public class EventoController {

    @Autowired
    private EventoService service;

    // GET ALL (com suporte opcional a filtros NoSQL $gt, $lt e $exists)
    @GetMapping
    public ResponseEntity<List<Evento>> getAll(
            @RequestParam(required = false) Double minPreco,
            @RequestParam(required = false) Double maxPreco,
            @RequestParam(required = false) Boolean comDescricao) {
        
        if (minPreco != null && maxPreco != null) {
            return ResponseEntity.ok(service.buscarPorFaixaPreco(minPreco, maxPreco));
        }
        if (Boolean.TRUE.equals(comDescricao)) {
            return ResponseEntity.ok(service.buscarComDescricao());
        }
        return ResponseEntity.ok(service.listarTodos());
    }

    // GET BY ID (String para compatibilidade com o ObjectId do Mongo)
    @GetMapping("/{id}")
    public ResponseEntity<Evento> getById(@PathVariable String id) {
        Evento evento = service.buscarPorId(id);
        if (evento != null) {
            return ResponseEntity.ok(evento);
        }
        return ResponseEntity.notFound().build();
    }

    // POST (insertOne)
    @PostMapping
    public ResponseEntity<Evento> post(@RequestBody Evento evento) {
        Evento novo = service.salvar(evento);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }

    // PUT (updateOne)
    @PutMapping("/{id}")
    public ResponseEntity<Evento> put(@PathVariable String id, @RequestBody Evento evento) {
        Evento atualizado = service.atualizar(id, evento);
        if (atualizado != null) {
            return ResponseEntity.ok(atualizado);
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE (deleteOne)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (service.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}