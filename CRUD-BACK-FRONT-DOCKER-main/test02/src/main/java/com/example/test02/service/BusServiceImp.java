package com.example.test02.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.test02.entity.BusEntity;
import com.example.test02.interfaces.IBusService;
@Service
public class BusServiceImp implements IBusService {
	
	private RestTemplate restTemplate = new RestTemplate();
	private final String url = "http://localhost:6789/api/v1/entities/buses";
	@Override
	public List<BusEntity> findAll() {
		BusEntity[] list = restTemplate.getForObject(url, BusEntity[].class);
		
		return list != null ? Arrays.asList(list):Arrays.asList();
	}

	@Override
	public BusEntity findById(Long id) {
		BusEntity bus = restTemplate.getForObject(url+"/"+id, BusEntity.class);
		return bus;
	}

	@Override
	public BusEntity save(BusEntity bus) {
		BusEntity busNuevo = restTemplate.postForObject(url, bus, BusEntity.class);
		return busNuevo;
	}

	@Override
	public void update(Long id, BusEntity bus) {
		restTemplate.put(url+"/"+id, bus);
	}

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		restTemplate.delete(url+"/"+id);
		
	}

}
