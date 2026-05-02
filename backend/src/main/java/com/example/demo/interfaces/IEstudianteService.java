package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.entity.EstudianteEntity;

public interface IEstudianteService {
	
	public List<EstudianteEntity> findAll();
	
	public EstudianteEntity findById(Long id);
	
	EstudianteEntity save(EstudianteEntity estudiante);
	
	void deleteById(long id);

}
