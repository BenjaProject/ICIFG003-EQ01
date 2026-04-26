package com.example.test02.interfaces;

import java.util.List;

import com.example.test02.entity.BusEntity;

public interface IBusService {
	List<BusEntity> findAll();
	BusEntity findById(Long id);
	BusEntity save(BusEntity bus);
	void update(Long id, BusEntity bus);
	void deleteById(Long id);
	
}
