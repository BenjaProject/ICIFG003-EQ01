package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.dto.InasistenciaDTO;
import com.example.demo.entity.InasitenciaEntity;

public interface IInasistenciaService {
    List<InasistenciaDTO> getAllInasistencias();
    InasitenciaEntity getInasistenciaById(Long id);
    InasitenciaEntity createInasistencia(InasitenciaEntity inasistencia);
    InasitenciaEntity createInasistenciaForEstudiante(Long estudianteId, InasitenciaEntity inasistencia);
    void deleteInasistencia(Long id);
}
