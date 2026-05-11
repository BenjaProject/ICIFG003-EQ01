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

import com.example.demo.entity.EstudianteEntity;
import com.example.demo.interfaces.IEstudianteService;

@RestController
@RequestMapping("/api/v1/entities/estudiante") //http://localhost:8080//api/v1/entities/estudiante

@CrossOrigin(origins = "http://localhost:4200")

public class EstudianteController {
	
	@Autowired
	private IEstudianteService service;
	
	@GetMapping
	public ResponseEntity<?> readEstudiantes() {
		try {
			return ResponseEntity.ok(service.findAll());
		} catch (Exception e) {
			return ResponseEntity.status(404).body(e.getMessage());
		}
	}

	@GetMapping("/curso/{cursoId}")
	public ResponseEntity<?> readEstudiantesByCurso(@PathVariable Long cursoId) {
		try {
			return ResponseEntity.ok(service.findByCursoId(cursoId));
		} catch (Exception e) {
			return ResponseEntity.status(404).body(e.getMessage());
		}
	}
	
	@PostMapping
	public ResponseEntity<?> createEstudiante(@RequestBody EstudianteEntity estudianteEntity) {
		try {
			EstudianteEntity nuevoEstudiante = service.save(estudianteEntity);
			return ResponseEntity.ok().body(nuevoEstudiante);
		} catch (Exception e) {
			return ResponseEntity.status(404).body(e.getMessage());
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateEstudiante(@PathVariable Long id, @RequestBody EstudianteEntity EstudianteActualizado) {
		try {
			EstudianteEntity existente = service.findById(id);
			if (existente == null) {
				return ResponseEntity.status(404).body("No se encontró estudiante para actualizar. ID; " + id + " \n");
			}
			else
			{
				existente.setNombre1(EstudianteActualizado.getNombre1());
				existente.setNombre2(EstudianteActualizado.getNombre2());
				existente.setApellido1(EstudianteActualizado.getApellido1());
				existente.setApellido2(EstudianteActualizado.getApellido2());
				existente.setRun(EstudianteActualizado.getRun());
				existente.setCurso(EstudianteActualizado.getCurso());
				EstudianteEntity actualizado = service.save(existente);
				return ResponseEntity.ok(actualizado);
			}
		} catch (Exception e) {
			return ResponseEntity.status(404).body(e.getMessage());
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteById(@PathVariable Long id) {
		try {
			service.deleteById(id);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error al eliminar al estudiante ID = " + id + " \n" + e);
		}
	}

}
