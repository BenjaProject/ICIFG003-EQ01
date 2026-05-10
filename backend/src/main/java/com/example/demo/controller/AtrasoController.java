package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
            return ResponseEntity.status(404).body(e);
        }
    }
}
