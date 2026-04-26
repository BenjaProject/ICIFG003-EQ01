package com.example.test02.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.test02.entity.BusEntity;
import com.example.test02.interfaces.IBusService;

@Controller
@RequestMapping("/crud/bus")
public class BusController {

	@Autowired
	private IBusService busService;
	
	
	@GetMapping
	public String listar(Model model) {
		List<BusEntity> buses = busService.findAll();
		model.addAttribute("buses",buses);
		return "indexbus";
	}
	
	@GetMapping("/nuevo")
	public String formularioNuevo(Model model) {
		model.addAttribute("bus", new BusEntity());
		return "bus-form";
	}
	
	@PostMapping("/guardar")
	public String guardarBus(@ModelAttribute("bus") BusEntity bus) {
		busService.save(bus);
		return "redirect:/crud/bus";
	}
	
	@GetMapping("/{id}")
	public String formularioEditar(@PathVariable("id") Long id, Model model) {
		BusEntity bus = busService.findById(id);
		model.addAttribute("bus", bus);
		return "bus-form";
	}
	
	@PostMapping("/actualizar/{id}")
	public String actualizarBus(@PathVariable("id") Long id, @ModelAttribute("bus") BusEntity bus) {
		busService.update(id, bus);
		return "redirect:/crud/bus";
	}
	
	@GetMapping("/eliminar/{id}")
	public String eliminarBus(@PathVariable Long id){
		busService.deleteById(id);
		return "redirect:/crud/bus";
		
	}
}
