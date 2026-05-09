package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.entity.InasitenciaEntity;

public interface IInasistenciaService {
    List<InasitenciaEntity> getAllInasistencias();
    InasitenciaEntity getInasistenciaById(Long id);
    InasitenciaEntity createInasistencia(InasitenciaEntity inasistencia);
    void deleteInasistencia(Long id);
}
