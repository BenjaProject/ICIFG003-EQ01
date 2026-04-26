package com.example.test02.interfaces;

import java.util.List;

import com.example.test02.entity.EstudianteEntity;

public interface IEstudianteService {
    List<EstudianteEntity> findAll();
    EstudianteEntity findById(Long id);
    EstudianteEntity save(EstudianteEntity estudiante);
    void deleteById(Long id);
    void update(Long id, EstudianteEntity estudiante);
}
