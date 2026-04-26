package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.EstudianteEntity;

@Repository
public interface EstudianteRepository extends CrudRepository<EstudianteEntity, Long> {

}
