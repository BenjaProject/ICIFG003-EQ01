package com.example.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@Table(name = "inasistencia")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InasitenciaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_estudiante")
    @JsonIgnoreProperties({"atrasos", "inasistencias", "curso", "hibernateLazyInitializer", "handler"})
    private EstudianteEntity estudiante;
    private String fecha;
    private Boolean justificada;

}
