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

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Evento>> getAll() {
        return ResponseEntity.ok(service.listarTodos());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Evento> getById(@PathVariable Long id) {
        Evento evento = service.buscarPorId(id);
        if (evento != null) {
            return ResponseEntity.ok(evento);
        }
        return ResponseEntity.notFound().build();
    }

    // POST
    @PostMapping
    public ResponseEntity<Evento> post(@RequestBody Evento evento) {
        Evento novo = service.salvar(evento);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }

    // PUT
    @PutMapping("/{id}")
    public ResponseEntity<Evento> put(@PathVariable Long id, @RequestBody Evento evento) {
        Evento atualizado = service.atualizar(id, evento);
        if (atualizado != null) {
            return ResponseEntity.ok(atualizado);
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (service.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}