package com.pio.cadunico.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pio.cadunico.Repository.UsuarioRepository;
import com.pio.cadunico.model.Usuario;

@Service
public class UsuarioService {
	
	@Autowired
	UsuarioRepository usuarioRepository;
	
	public Usuario salvar(Usuario usuario) {
		return usuarioRepository.save(usuario);
	}

	public void excluir(Long usuarioId) {
		usuarioRepository.deleteById(usuarioId);
	}
}
