package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.CursoEntity;
import com.example.demo.interfaces.ICursoService;
import com.example.demo.repository.CursoRepository;

@Service
public class CursoServiceImpl implements ICursoService {

    @Autowired
    private CursoRepository cursoRepository;
    @Override
    public List<CursoEntity> getAllCursos() {
        return cursoRepository.findAll();
    }

    @Override
    public CursoEntity getCursoById(Long id) {
        return cursoRepository.findById(id).orElse(null);
    }

    @Override
    public CursoEntity createCurso(CursoEntity curso) {
        return cursoRepository.save(curso);
    }

    @Override
    public void deleteCurso(Long id) {
        cursoRepository.deleteById(id);
    }

}
