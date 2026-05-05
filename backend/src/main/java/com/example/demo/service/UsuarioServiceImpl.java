package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.UsuarioEntity;
import com.example.demo.interfaces.IUsuarioService;
import com.example.demo.repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements IUsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public List<UsuarioEntity> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public UsuarioEntity getUsuarioById(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @Override
    public UsuarioEntity createUsuario(UsuarioEntity usuario) {
        return usuarioRepository.save(usuario);
    }

    @Override
    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public Boolean login(String username, String password) {
        List<UsuarioEntity> usuarios = usuarioRepository.findAll();
        for (UsuarioEntity usuario : usuarios) {
            if (usuario.getUsername().equals(username) && usuario.getPassword().equals(password)) {
                
                return true;

            }
        }
        
        return false;
        
    }

    


}

