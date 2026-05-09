package com.example.demo.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrity(DataIntegrityViolationException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Conflicto de datos");
        response.put("mensaje", "El nombre de usuario o email ya existe.");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    // Captura las excepciones de validación manual (como la del Service)
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, String>> handleResponseStatus(ResponseStatusException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Error de validación");
        response.put("mensaje", ex.getReason());
        return ResponseEntity.status(ex.getRawStatusCode()).body(response);
    }


}
