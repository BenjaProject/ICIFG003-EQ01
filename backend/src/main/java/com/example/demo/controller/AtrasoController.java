package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.AtrasoEntity;
import com.example.demo.interfaces.IAtrasoService;

@RestController
@RequestMapping("/api/v1/entities/atrasos")
@CrossOrigin(origins = "http://localhost:4200")
public class AtrasoController {

    @Autowired
    private IAtrasoService atrasoService;

    @GetMapping
    public ResponseEntity<?> getAllAtrasos() {
        try {
            return ResponseEntity.ok(atrasoService.getAllAtrasos());
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/estudiante/{estudianteId}")
    public ResponseEntity<?> getAtrasosByEstudiante(@PathVariable Long estudianteId) {
        try {
            return ResponseEntity.ok(atrasoService.getAtrasosByEstudianteId(estudianteId));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/curso/{cursoId}")
    public ResponseEntity<?> getAtrasosByCurso(@PathVariable Long cursoId) {
        try {
            return ResponseEntity.ok(atrasoService.getAtrasosByCursoId(cursoId));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAtrasoById(@PathVariable Long id) {
        try {
            AtrasoEntity atraso = atrasoService.getAtrasoById(id);
            if (atraso == null) {
                return ResponseEntity.status(404).body("Atraso no encontrado con ID: " + id);
            }
            return ResponseEntity.ok(atraso);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/{estudianteId}")
    public ResponseEntity<?> createAtraso(@PathVariable Long estudianteId, @RequestBody AtrasoEntity atrasoEntity) {
        try {
            if (estudianteId == null) {
                return ResponseEntity.status(400).body("ID del estudiante es requerido");
            }
            AtrasoEntity nuevoAtraso = atrasoService.createAtrasoForEstudiante(estudianteId, atrasoEntity);
            return ResponseEntity.ok().body(nuevoAtraso);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAtraso(@PathVariable Long id, @RequestBody AtrasoEntity atrasoActualizado) {
        try {
            AtrasoEntity existente = atrasoService.getAtrasoById(id);
            if (existente == null) {
                return ResponseEntity.status(404).body("No se encontró atraso para actualizar. ID: " + id);
            } else {
                existente.setFecha(atrasoActualizado.getFecha());
                existente.setHora(atrasoActualizado.getHora());
                existente.setRazon(atrasoActualizado.getRazon());
                AtrasoEntity actualizado = atrasoService.createAtraso(existente);
                return ResponseEntity.ok(actualizado);
            }
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAtraso(@PathVariable Long id) {
        try {
            atrasoService.deleteAtraso(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al eliminar atraso ID = " + id + " \n" + e.getMessage());
        }
    }
}
