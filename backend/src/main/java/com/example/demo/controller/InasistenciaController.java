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

import com.example.demo.entity.InasitenciaEntity;
import com.example.demo.interfaces.IInasistenciaService;

@RestController
@RequestMapping("/api/v1/entities/inasistencias")
@CrossOrigin(origins = "http://localhost:4200")
public class InasistenciaController {

    @Autowired
    private IInasistenciaService inasistenciaService;

    @GetMapping
    public ResponseEntity<?> getAllInasistencias() {
        try {
            return ResponseEntity.ok(inasistenciaService.getAllInasistencias());
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/curso/{cursoId}")
    public ResponseEntity<?> getInasistenciasByCurso(@PathVariable Long cursoId) {
        try {
            return ResponseEntity.ok(inasistenciaService.getInasistenciasByCursoId(cursoId));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getInasistenciaById(@PathVariable Long id) {
        try {
            InasitenciaEntity inasistencia = inasistenciaService.getInasistenciaById(id);
            if (inasistencia == null) {
                return ResponseEntity.status(404).body("Inasistencia no encontrada con ID: " + id);
            }
            return ResponseEntity.ok(inasistencia);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/{estudianteId}")
    public ResponseEntity<?> createInasistencia(@PathVariable Long estudianteId, @RequestBody InasitenciaEntity inasistenciaEntity) {
        try {
            if (estudianteId == null) {
                return ResponseEntity.status(400).body("ID del estudiante es requerido");
            }
            InasitenciaEntity nuevaInasistencia = inasistenciaService.createInasistenciaForEstudiante(estudianteId, inasistenciaEntity);
            return ResponseEntity.ok().body(nuevaInasistencia);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateInasistencia(@PathVariable Long id, @RequestBody InasitenciaEntity inasistenciaActualizada) {
        try {
            InasitenciaEntity existente = inasistenciaService.getInasistenciaById(id);
            if (existente == null) {
                return ResponseEntity.status(404).body("No se encontró inasistencia para actualizar. ID: " + id);
            } else {
                existente.setFecha(inasistenciaActualizada.getFecha());
                existente.setJustificada(inasistenciaActualizada.getJustificada());
                InasitenciaEntity actualizada = inasistenciaService.createInasistencia(existente);
                return ResponseEntity.ok(actualizada);
            }
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInasistencia(@PathVariable Long id) {
        try {
            inasistenciaService.deleteInasistencia(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al eliminar inasistencia ID = " + id + " \n" + e.getMessage());
        }
    }
}
