package com.example.test02.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.test02.entity.EstudianteEntity;
import com.example.test02.interfaces.IEstudianteService;

@Controller
@RequestMapping("/crud/estudiantes")
public class EstudianteController {
    @Autowired
    private IEstudianteService estudianteService;

    @GetMapping
    public String listar(Model model) {
        List<EstudianteEntity> lista = estudianteService.findAll();
        model.addAttribute("estudiantes", lista);
        return "index";
    }

    @GetMapping("/nuevo")
    public String formularioNuevo(Model model) {
        model.addAttribute("estudiante", new EstudianteEntity());
        return "estudiantes-form";
    }

   @PostMapping("/guardar") 
    public String guardar(@ModelAttribute("estudiante") EstudianteEntity estudiante) {
        estudianteService.save(estudiante);
        return "redirect:/crud/estudiantes";
    }

    @GetMapping("/{id}/editar")
    public String formularioEditar(@PathVariable("id") Long id, Model model) {
        EstudianteEntity estudiante = estudianteService.findById(id);
        model.addAttribute("estudiante", estudiante);
        return "estudiantes-form";
    }

    @PostMapping("/actualizar/{id}")
    public String actualizar(@PathVariable("id") Long id, @ModelAttribute("estudiante") EstudianteEntity estudiante) {
       
        estudianteService.update(id, estudiante);
        return "redirect:/crud/estudiantes";
    }

    @GetMapping("/eliminar/{id}")
    public String eliminar(@PathVariable("id") Long id) {
        estudianteService.deleteById(id);
        return "redirect:/crud/estudiantes";
    }
}



