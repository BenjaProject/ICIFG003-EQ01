package com.example.test02.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BusEntity {
	private Long id;
	private String patente;
	private String marca;
	private double km;
	private int anio;
	private char combustible;
	private boolean revisionAlDia;
}
