package com.example.demo.dto;

public record InasistenciaDTO(
        Long id,
        String fecha,
        Boolean justificada,
        String nombreEstudiante,
        String apellidoEstudiante
) {
}
