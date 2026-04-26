package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.EstudianteEntity;
import com.example.demo.interfaces.IEstudianteService;
import com.example.demo.repository.EstudianteRepository;

@Service
public class EstudianteServiceImp implements IEstudianteService {

	
	@Autowired
	private EstudianteRepository estudianteRepository;
	
	@Override
	public List<EstudianteEntity> findAll() {
		// TODO Auto-generated method stub
		return (List<EstudianteEntity>) estudianteRepository.findAll();
	}

	@Override
	public EstudianteEntity findById(Long id){
		return estudianteRepository.findById(id).orElse(null);

	}

	@Override
	public EstudianteEntity save(EstudianteEntity estudiante) {
		
		return estudianteRepository.save(estudiante);

	}

	@Override
	public void deleteById(Long id) {
		estudianteRepository.deleteById(id);
	}

	

}
