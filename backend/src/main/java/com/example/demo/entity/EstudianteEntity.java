package com.example.demo.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Formula;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "estudiante")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EstudianteEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("idEstudiante")
	private Long id;
	
	private String nombre1;
	private String nombre2;
	private String apellido1;
	private String apellido2;

	@Column(unique = true)
	private String run;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_curso")
	@JsonIgnoreProperties({"estudiantes", "hibernateLazyInitializer", "handler"})
	private CursoEntity curso;

	@Formula("(SELECT COUNT(*) FROM inasistencia i WHERE i.id_estudiante = id)")
	private Long cantidadInasistencias;

	@Formula("(SELECT COUNT(*) FROM atraso a WHERE a.id_estudiante = id)")
	private Long cantidadAtrasos;

	@OneToMany(mappedBy = "estudiante", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<AtrasoEntity> atrasos;

	@OneToMany(mappedBy = "estudiante", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<InasitenciaEntity> inasistencias;

}
