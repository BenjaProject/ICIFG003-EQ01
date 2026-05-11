package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.example.demo.entity.AtrasoEntity;
import com.example.demo.dto.AtrasoDTO;

@Repository
public interface AtrasoRepository extends JpaRepository<AtrasoEntity, Long> {
	@Query("""
		select new com.example.demo.dto.AtrasoDTO(
			a.id,
			a.fecha,
			a.hora,
			a.razon,
			concat(coalesce(e.nombre1, ''), case when e.nombre2 is null or e.nombre2 = '' then '' else concat(' ', e.nombre2) end),
			concat(coalesce(e.apellido1, ''), case when e.apellido2 is null or e.apellido2 = '' then '' else concat(' ', e.apellido2) end)
		)
		from AtrasoEntity a
		left join a.estudiante e
		""")
	List<AtrasoDTO> findAllDtos();
}
