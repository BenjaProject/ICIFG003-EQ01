package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
            return ResponseEntity.status(404).body(e);
        }
    }
}
