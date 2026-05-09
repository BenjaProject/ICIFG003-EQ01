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
	private Long id;
	
	private String nombre1;
	private String nombre2;
	private String apellido1;
	private String apellido2;

	@Column(unique = true)
	private String run;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_curso")
	private CursoEntity curso;

	@Formula("(SELECT COUNT(*) FROM atrasos a WHERE a.id_estudiante = id_estudiante)")
	private Long cantidadInasistencias;

	@Formula("(SELECT COUNT(*) FROM inasistencias i WHERE i.id_estudiante = id_estudiante)")
	private Long cantidadAtrasos;

	@OneToMany(mappedBy = "estudiante", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<AtrasoEntity> atrasos;

	@OneToMany(mappedBy = "estudiante", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<InasitenciaEntity> inasistencias;

}
