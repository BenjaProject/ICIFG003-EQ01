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

import com.example.test02.entity.PersonaEntity;
import com.example.test02.interfaces.IPersonaService;

@Controller
@RequestMapping("/crud/personas")
public class PersonaController {
    @Autowired
    private IPersonaService personaService;

    @GetMapping
    public String listar(Model model) {
        List<PersonaEntity> lista = personaService.findAll();
        model.addAttribute("personas", lista);
        return "index";
    }

    @GetMapping("/nuevo")
    public String formularioNuevo(Model model) {
        model.addAttribute("persona", new PersonaEntity());
        return "personas-form";
    }

   @PostMapping("/guardar") 
    public String guardar(@ModelAttribute("persona") PersonaEntity persona) {
        personaService.save(persona);
        return "redirect:/crud/personas";
    }

    @GetMapping("/{id}/editar")
    public String formularioEditar(@PathVariable("id") Long id, Model model) {
        PersonaEntity persona = personaService.findById(id);
        model.addAttribute("persona", persona);
        return "personas-form";
    }

    @PostMapping("/actualizar/{id}")
    public String actualizar(@PathVariable("id") Long id, @ModelAttribute("persona") PersonaEntity persona) {
       
        personaService.update(id, persona);
        return "redirect:/crud/personas";
    }

    @GetMapping("/eliminar/{id}")
    public String eliminar(@PathVariable("id") Long id) {
        personaService.deleteById(id);
        return "redirect:/crud/personas";
    }
}



