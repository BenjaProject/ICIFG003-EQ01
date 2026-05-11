package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.InasitenciaEntity;
import com.example.demo.dto.InasistenciaDTO;
@Repository
public interface InasistenciaRepository extends JpaRepository<InasitenciaEntity, Long> {
	@Query("""
		select new com.example.demo.dto.InasistenciaDTO(
			i.id,
			i.fecha,
			i.justificada,
			e.id,
			c.id,
			c.nombreCurso,
			concat(coalesce(e.nombre1, ''), case when e.nombre2 is null or e.nombre2 = '' then '' else concat(' ', e.nombre2) end),
			concat(coalesce(e.apellido1, ''), case when e.apellido2 is null or e.apellido2 = '' then '' else concat(' ', e.apellido2) end)
		)
		from InasitenciaEntity i
		join i.estudiante e
		join e.curso c
		where c.id = :cursoId
		""")
	List<InasistenciaDTO> findDtoByCursoId(@Param("cursoId") Long cursoId);

	@Query("""
		select new com.example.demo.dto.InasistenciaDTO(
			i.id,
			i.fecha,
			i.justificada,
			e.id,
			c.id,
			c.nombreCurso,
			concat(coalesce(e.nombre1, ''), case when e.nombre2 is null or e.nombre2 = '' then '' else concat(' ', e.nombre2) end),
			concat(coalesce(e.apellido1, ''), case when e.apellido2 is null or e.apellido2 = '' then '' else concat(' ', e.apellido2) end)
		)
		from InasitenciaEntity i
		join i.estudiante e
		join e.curso c
		""")
	List<InasistenciaDTO> findAllDtos();
}
