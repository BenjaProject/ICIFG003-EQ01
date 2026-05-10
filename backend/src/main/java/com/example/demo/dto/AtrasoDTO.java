package com.example.demo.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record AtrasoDTO(
        Long id,
        LocalDate fecha,
        LocalTime hora,
        String razon,
        String nombreEstudiante,
        String apellidoEstudiante
) {
}
