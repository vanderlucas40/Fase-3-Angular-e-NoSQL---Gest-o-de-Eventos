package com.projeto.evento.controllers;

import com.projeto.evento.entities.Participante;
import com.projeto.evento.services.ParticipanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/participantes")
@CrossOrigin(origins = "*")
public class ParticipanteController {

    @Autowired
    private ParticipanteService service;

    @GetMapping
    public ResponseEntity<List<Participante>> getAll() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Participante> getById(@PathVariable String id) {
        Participante participante = service.buscarPorId(id);
        if (participante != null) {
            return ResponseEntity.ok(participante);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Participante> post(@RequestBody Participante participante) {
        Participante novo = service.salvar(participante);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Participante> put(@PathVariable String id, @RequestBody Participante participante) {
        Participante atualizado = service.atualizar(id, participante);
        if (atualizado != null) {
            return ResponseEntity.ok(atualizado);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (service.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}