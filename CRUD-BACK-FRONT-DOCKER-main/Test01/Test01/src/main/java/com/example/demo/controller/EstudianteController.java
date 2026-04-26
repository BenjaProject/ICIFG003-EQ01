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

import com.example.demo.entity.EstudianteEntity;
import com.example.demo.interfaces.IEstudianteService;

@RestController
@RequestMapping("/api/v1/entities/estudiantes")
public class EstudianteController {
	
	@Autowired
	private IEstudianteService estudianteService;
	
	@GetMapping
	public ResponseEntity<?> findAll(){
		try {
			return ResponseEntity.ok(estudianteService.findAll());
		} catch (Exception e) {
			return ResponseEntity.status(404).body(e);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable Long id){
		try {
			return ResponseEntity.ok(estudianteService.findById(id));
		} catch (Exception e) {
			return ResponseEntity.status(404).body(e);
		}
	}

	@PostMapping
	public ResponseEntity<?> save(@RequestBody EstudianteEntity estudiante){
		try {
			return ResponseEntity.ok(estudianteService.save(estudiante));
		} catch (Exception e) {
			return ResponseEntity.status(404).body(e);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(@RequestBody EstudianteEntity estudiante, @PathVariable Long id){
		try {
			EstudianteEntity existingEstudiante = estudianteService.findById(id);
			if (existingEstudiante == null) {
				return ResponseEntity.status(404).body("Estudiante no encontrado");
			}
			existingEstudiante.setNombre(estudiante.getNombre());
			return ResponseEntity.ok(estudianteService.save(existingEstudiante));
		} catch (Exception e) {
			return ResponseEntity.status(404).body(e);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id){
		try {
			EstudianteEntity existingEstudiante = estudianteService.findById(id);
			if (existingEstudiante == null) {
				return ResponseEntity.status(404).body("Estudiante no encontrado");
			}
			estudianteService.deleteById(id);
			return ResponseEntity.ok("Estudiante eliminada exitosamente");
		} catch (Exception e) {
			return ResponseEntity.status(404).body(e);
		}
	}

}