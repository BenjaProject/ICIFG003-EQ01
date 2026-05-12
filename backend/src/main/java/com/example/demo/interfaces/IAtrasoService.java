package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.dto.AtrasoDTO;
import com.example.demo.entity.AtrasoEntity;

public interface IAtrasoService {
    List<AtrasoDTO> getAllAtrasos();
    List<AtrasoDTO> getAtrasosByEstudianteId(Long estudianteId);
    List<AtrasoDTO> getAtrasosByCursoId(Long cursoId);
    AtrasoEntity getAtrasoById(Long id);
    AtrasoEntity createAtraso(AtrasoEntity atraso);
    AtrasoEntity createAtrasoForEstudiante(Long estudianteId, AtrasoEntity atraso);
    void deleteAtraso(Long id);
}
