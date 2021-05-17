package com.pio.CadUnico.service;

import java.time.LocalDate;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pio.CadUnico.model.Usuario;
import com.pio.CadUnico.repository.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	UsuarioRepository usuarioRepository;
	
	public Usuario salvar(Usuario usuario) {
		LocalDate dataCriacao = LocalDate.now();
		usuario.setDataCriacao(dataCriacao);
		return usuarioRepository.save(usuario);
	}

	public void excluir(Long usuarioId) {
		usuarioRepository.deleteById(usuarioId);
	}
}
