package com.example.demo.dto;

public record InasistenciaDTO(
        Long id,
        String fecha,
        Boolean justificada,
        Long estudianteId,
        Long cursoId,
        String nombreCurso,
        String nombreEstudiante,
        String apellidoEstudiante
) {
}
