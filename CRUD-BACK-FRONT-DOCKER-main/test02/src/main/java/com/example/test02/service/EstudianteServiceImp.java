package com.example.test02.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.test02.entity.EstudianteEntity;
import com.example.test02.interfaces.IEstudianteService;

@Service
public class EstudianteServiceImp implements IEstudianteService {

    RestTemplate restTemplate = new RestTemplate();
    private static final String BASE_URL = "http://backend:9991/api/v1/entities/estudiantes";

    @Override
    public List<EstudianteEntity> findAll() {
        EstudianteEntity[] list = restTemplate.getForObject(BASE_URL, EstudianteEntity[].class);
        return list != null ? Arrays.asList(list) : Arrays.asList();
    }

    @Override
    public EstudianteEntity findById(Long id) {
        EstudianteEntity estudiante = restTemplate.getForObject(BASE_URL + "/" + id, EstudianteEntity.class);
        return estudiante;
    }

    @Override
    public EstudianteEntity save(EstudianteEntity estudiante) {
        EstudianteEntity savedEstudiante = restTemplate.postForObject(BASE_URL, estudiante, EstudianteEntity.class);
        return savedEstudiante;
    }

    @Override
    public void deleteById(Long id) {
        restTemplate.delete(BASE_URL + "/" + id);
    }

    @Override
    public void update(Long id, EstudianteEntity estudiante) {
        restTemplate.put(BASE_URL + "/" + id, estudiante);
    }

}
