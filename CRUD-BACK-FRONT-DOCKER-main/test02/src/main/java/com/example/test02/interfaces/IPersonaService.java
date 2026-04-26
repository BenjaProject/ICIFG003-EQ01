package com.example.test02.interfaces;

import java.util.List;

import com.example.test02.entity.PersonaEntity;

public interface IPersonaService {
    List<PersonaEntity> findAll();
    PersonaEntity findById(Long id);
    PersonaEntity save(PersonaEntity persona);
    void deleteById(Long id);
    void update(Long id, PersonaEntity persona);
}
