package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.EstudianteEntity;
import com.example.demo.interfaces.IEstudianteService;
import com.example.demo.repository.EstudianteRepository;

@Service
public class EstudianteServiceImpl implements IEstudianteService{

	@Autowired
	private EstudianteRepository repositoryEstudiante;
	
	@Override
	public List<EstudianteEntity> findAll() {
		return (List<EstudianteEntity>) repositoryEstudiante.findAll();
	}

	@Override
	public List<EstudianteEntity> findByCursoId(Long cursoId) {
		return repositoryEstudiante.findByCurso_Id(cursoId);
	}

	@Override
	public EstudianteEntity findById(Long id) {
		Optional<EstudianteEntity> ope = repositoryEstudiante.findById(id);
		return ope.orElse(null);
	}

	@Override
	public EstudianteEntity save(EstudianteEntity estudiante) {
		return repositoryEstudiante.save(estudiante);
	}

	@Override
	public void deleteById(long id) {
		repositoryEstudiante.deleteById(id);
		
	}

}
