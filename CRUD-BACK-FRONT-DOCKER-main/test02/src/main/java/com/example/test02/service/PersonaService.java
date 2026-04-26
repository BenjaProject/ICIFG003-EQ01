package com.example.test02.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.test02.entity.PersonaEntity;
import com.example.test02.interfaces.IPersonaService;

@Service
public class PersonaService implements IPersonaService {

    RestTemplate restTemplate = new RestTemplate();
    private static final String BASE_URL = "http://backend:9991/api/v1/entities/personas";

    @Override
    public List<PersonaEntity> findAll() {
        PersonaEntity[] list = restTemplate.getForObject(BASE_URL, PersonaEntity[].class);
        return list != null ? Arrays.asList(list) : Arrays.asList();
    }

    @Override
    public PersonaEntity findById(Long id) {
        PersonaEntity persona = restTemplate.getForObject(BASE_URL + "/" + id, PersonaEntity.class);
        return persona;
    }

    @Override
    public PersonaEntity save(PersonaEntity persona) {
        PersonaEntity savedPersona = restTemplate.postForObject(BASE_URL, persona, PersonaEntity.class);
        return savedPersona;
    }

    @Override
    public void deleteById(Long id) {
        restTemplate.delete(BASE_URL + "/" + id);
    }

    @Override
    public void update(Long id, PersonaEntity persona) {
        restTemplate.put(BASE_URL + "/" + id, persona);
    }

}
