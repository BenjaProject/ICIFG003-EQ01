package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.EntityGraph;

import com.example.demo.entity.EstudianteEntity;

@Repository
public interface EstudianteRepository extends JpaRepository<EstudianteEntity, Long> {

	@EntityGraph(attributePaths = {"curso"})
	List<EstudianteEntity> findByCurso_Id(Long cursoId);

	@Override
	@EntityGraph(attributePaths = {"curso"})
	List<EstudianteEntity> findAll();
}
