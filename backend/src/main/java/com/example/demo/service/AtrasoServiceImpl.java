package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.AtrasoDTO;
import com.example.demo.entity.AtrasoEntity;
import com.example.demo.entity.EstudianteEntity;
import com.example.demo.interfaces.IAtrasoService;
import com.example.demo.interfaces.IEstudianteService;
import com.example.demo.repository.AtrasoRepository;
@Service
public class AtrasoServiceImpl implements IAtrasoService {
    @Autowired
    private AtrasoRepository atrasoRepository;
    
    @Autowired
    private IEstudianteService estudianteService;
    
    @Override
    public List<AtrasoDTO> getAllAtrasos() {
        return atrasoRepository.findAllDtos();
    }

    @Override
    public List<AtrasoDTO> getAtrasosByEstudianteId(Long estudianteId) {
        return atrasoRepository.findDtosByEstudianteId(estudianteId);
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
    public AtrasoEntity createAtrasoForEstudiante(Long estudianteId, AtrasoEntity atraso) {
        EstudianteEntity estudiante = estudianteService.findById(estudianteId);
        if (estudiante != null) {
            atraso.setEstudiante(estudiante);
            return atrasoRepository.save(atraso);
        }
        throw new IllegalArgumentException("Estudiante no encontrado con ID: " + estudianteId);
    }

    @Override
    public void deleteAtraso(Long id) {
        atrasoRepository.deleteById(id);
    }

    private AtrasoDTO mapToDto(AtrasoEntity atraso) {
        EstudianteEntity estudiante = atraso.getEstudiante();
        String nombreEstudiante = "";
        String apellidoEstudiante = "";

        if (estudiante != null) {
            nombreEstudiante = concatParts(estudiante.getNombre1(), estudiante.getNombre2());
            apellidoEstudiante = concatParts(estudiante.getApellido1(), estudiante.getApellido2());
        }

        return new AtrasoDTO(
                atraso.getId(),
                atraso.getFecha(),
                atraso.getHora(),
                atraso.getRazon(),
                nombreEstudiante,
                apellidoEstudiante
        );
    }

    private String concatParts(String first, String second) {
        String left = normalizePart(first);
        String right = normalizePart(second);
        if (left.isEmpty()) {
            return right;
        }
        if (right.isEmpty()) {
            return left;
        }
        return left + " " + right;
    }

    private String normalizePart(String value) {
        return value == null ? "" : value.trim();
    }

}
