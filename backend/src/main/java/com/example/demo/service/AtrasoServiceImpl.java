package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.AtrasoEntity;
import com.example.demo.interfaces.IAtrasoService;
import com.example.demo.repository.AtrasoRepository;
@Service
public class AtrasoServiceImpl implements IAtrasoService {
    @Autowired
    private AtrasoRepository atrasoRepository;
    @Override
    public List<AtrasoEntity> getAllAtrasos() {
        return atrasoRepository.findAll();
    }

    @Override
    public AtrasoEntity getAtrasoById(Long id) {
        return atrasoRepository.findById(id).orElse(null);
    }

    @Override
    public AtrasoEntity createAtraso(AtrasoEntity atraso) {
        return atrasoRepository.save(atraso);
    }

    @Override
    public void deleteAtraso(Long id) {
        atrasoRepository.deleteById(id);
    }

}
