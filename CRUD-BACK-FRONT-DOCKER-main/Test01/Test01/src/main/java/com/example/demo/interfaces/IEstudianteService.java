package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.entity.EstudianteEntity;

public interface IEstudianteService {
	
	List<EstudianteEntity> findAll();

	EstudianteEntity findById(Long id);

	EstudianteEntity save(EstudianteEntity estudiante);
	
	void deleteById(Long id);
	

}
