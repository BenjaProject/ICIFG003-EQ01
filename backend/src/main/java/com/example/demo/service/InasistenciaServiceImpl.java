package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.InasistenciaDTO;
import com.example.demo.entity.EstudianteEntity;
import com.example.demo.entity.InasitenciaEntity;
import com.example.demo.interfaces.IEstudianteService;
import com.example.demo.interfaces.IInasistenciaService;
import com.example.demo.repository.InasistenciaRepository;

@Service
public class InasistenciaServiceImpl implements IInasistenciaService {
    @Autowired
    private InasistenciaRepository inasistenciaRepository;
    
    @Autowired
    private IEstudianteService estudianteService;
    @Override
    public List<InasistenciaDTO> getAllInasistencias() {
        return inasistenciaRepository.findAllDtos();
    }

    @Override
    public List<InasistenciaDTO> getInasistenciasByCursoId(Long cursoId) {
        return inasistenciaRepository.findDtoByCursoId(cursoId);
    }

    @Override
    public InasitenciaEntity getInasistenciaById(Long id) {
        return inasistenciaRepository.findById(id).orElse(null);
    }

    @Override
    public InasitenciaEntity createInasistencia(InasitenciaEntity inasistencia) {
        return inasistenciaRepository.save(inasistencia);
    }

    @Override
    public InasitenciaEntity createInasistenciaForEstudiante(Long estudianteId, InasitenciaEntity inasistencia) {
        EstudianteEntity estudiante = estudianteService.findById(estudianteId);
        if (estudiante != null) {
            inasistencia.setEstudiante(estudiante);
            return inasistenciaRepository.save(inasistencia);
        }
        throw new IllegalArgumentException("Estudiante no encontrado con ID: " + estudianteId);
    }

    @Override
    public void deleteInasistencia(Long id) {
        inasistenciaRepository.deleteById(id);
    }

    private InasistenciaDTO mapToDto(InasitenciaEntity inasistencia) {
        EstudianteEntity estudiante = inasistencia.getEstudiante();
        String nombreEstudiante = "";
        String apellidoEstudiante = "";
        Long estudianteId = null;
        Long cursoId = null;
        String nombreCurso = "";

        if (estudiante != null) {
            estudianteId = estudiante.getId();
            nombreEstudiante = concatParts(estudiante.getNombre1(), estudiante.getNombre2());
            apellidoEstudiante = concatParts(estudiante.getApellido1(), estudiante.getApellido2());
            if (estudiante.getCurso() != null) {
                cursoId = estudiante.getCurso().getId();
                nombreCurso = estudiante.getCurso().getNombreCurso();
            }
        }

        return new InasistenciaDTO(
                inasistencia.getId(),
                inasistencia.getFecha(),
                inasistencia.getJustificada(),
                estudianteId,
                cursoId,
                nombreCurso,
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
