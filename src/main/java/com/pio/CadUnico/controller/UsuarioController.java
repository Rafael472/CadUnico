package com.pio.CadUnico.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.pio.CadUnico.model.Usuario;
import com.pio.CadUnico.repository.UsuarioRepository;
import com.pio.CadUnico.service.UsuarioService;

@RestController
@CrossOrigin
@RequestMapping("/usuario")
public class UsuarioController {

	@Autowired UsuarioService usuarioService;
	@Autowired UsuarioRepository usuarioRepository;
	
	
	@GetMapping("/listar")
	public @ResponseBody List<Usuario> listar() {
		return usuarioRepository.findAll();
	}
	
	@GetMapping("/{usuarioId}")
	public ResponseEntity<Usuario> buscar(@PathVariable Long usuarioId) {
		Optional<Usuario> usuario = usuarioRepository.findById(usuarioId);
		
		if(usuario.isPresent()) {
			return ResponseEntity.ok(usuario.get());
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping("/cadastrar")
	@ResponseStatus(HttpStatus.CREATED)
	public @ResponseBody Usuario cadastrar(@Validated @RequestBody Usuario usuario){
		return usuarioService.salvar(usuario);
	}
	
	@PutMapping("/{usuarioId}")
	public ResponseEntity<Usuario> atualizar(@Validated @RequestBody Usuario usuario, @PathVariable Long usuarioId){
		
		if(!usuarioRepository.existsById(usuarioId))
			return ResponseEntity.notFound().build();
		
		usuario.setId(usuarioId);
		usuario = usuarioService.salvar(usuario);
		
		return ResponseEntity.ok(usuario);
	}

	@DeleteMapping("/excluir/{usuarioId}")
	public ResponseEntity<Void> remover(@PathVariable Long usuarioId){
		if(!usuarioRepository.existsById(usuarioId))
			return ResponseEntity.notFound().build();
		
		usuarioService.excluir(usuarioId);
		return ResponseEntity.noContent().build();
	}
	
}
