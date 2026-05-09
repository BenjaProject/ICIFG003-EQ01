package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.InasitenciaEntity;
@Repository
public interface InasistenciaRepository extends JpaRepository<InasitenciaEntity, Long> {

}
