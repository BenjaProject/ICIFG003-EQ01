package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.demo.entity.CursoEntity;
import com.example.demo.interfaces.ICursoService;

@RestController
@RequestMapping("/api/v1/entities/cursos")
@CrossOrigin(origins = "http://localhost:4200")
public class CursoController {
    @Autowired
    private ICursoService cursoService;

    @GetMapping
    public ResponseEntity<?> getAllCursos(){
        try {
            return ResponseEntity.ok(cursoService.getAllCursos());
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e);
        }
    }

    @PostMapping
    public ResponseEntity<?> createCurso(@RequestBody CursoEntity curso){
        try {
            return ResponseEntity.ok(cursoService.createCurso(curso));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCurso(@PathVariable Long id, @RequestBody CursoEntity curso){
        try {
            CursoEntity existingCurso = cursoService.getCursoById(id);
            if(existingCurso == null){
                return ResponseEntity.status(404).body("Curso not found");
            }
            existingCurso.setNombreCurso(curso.getNombreCurso());
            return ResponseEntity.ok(cursoService.createCurso(existingCurso));
            
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCurso(@PathVariable Long id){
        try {
            CursoEntity existingCurso = cursoService.getCursoById(id);
            if(existingCurso == null){
                return ResponseEntity.status(404).body("Curso not found");
            }
            cursoService.deleteCurso(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e);
        }
    }
}
