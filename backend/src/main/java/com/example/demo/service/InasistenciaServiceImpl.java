package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.InasitenciaEntity;
import com.example.demo.interfaces.IInasistenciaService;
import com.example.demo.repository.InasistenciaRepository;

@Service
public class InasistenciaServiceImpl implements IInasistenciaService {
    @Autowired
    private InasistenciaRepository inasistenciaRepository;
    @Override
    public List<InasitenciaEntity> getAllInasistencias() {
        return inasistenciaRepository.findAll();
    }

    @Override
    public InasitenciaEntity getInasistenciaById(Long id) {
        return inasistenciaRepository.findById(id).orElse(null);
    }

    @Override
    public InasitenciaEntity createInasistencia(InasitenciaEntity inasistencia) {
        return inasistenciaRepository.save(inasistencia);
    }

    @Override
    public void deleteInasistencia(Long id) {
        inasistenciaRepository.deleteById(id);
    }

}
