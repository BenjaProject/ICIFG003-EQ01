package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.entity.UsuarioEntity;

public interface IUsuarioService {

    List<UsuarioEntity> getAllUsuarios();
    UsuarioEntity getUsuarioById(Long id);
    UsuarioEntity createUsuario(UsuarioEntity usuario);
    void deleteUsuario(Long id);
    Boolean login(String username, String password);

}
