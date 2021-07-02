package com.sucateria.sucateriaProjeto.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sucateria.sucateriaProjeto.model.Usuario;
import com.sucateria.sucateriaProjeto.model.dto.UsuarioDTO;
import com.sucateria.sucateriaProjeto.repository.UsuarioRepository;
import com.sucateria.sucateriaProjeto.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
@CrossOrigin("*")
public class UsusarioController {
	// @Autowired private UsuarioRepository repositoryU;
	@Autowired
	private UsuarioService serviceU;
	@Autowired
	private UsuarioRepository repositoryU;

	@PostMapping
	public ResponseEntity<Object> cadastrarUsuario(@Valid @RequestBody Usuario usuario) {
		return serviceU.cadastrarUsuario(usuario);
	}

	@GetMapping
	public ResponseEntity<List<Usuario>> listarTodos() {
		return ResponseEntity.ok(repositoryU.findAll());
	}

	@GetMapping("/buscar/id/{id_usuario}")
	public ResponseEntity<Usuario> listarId(@Valid @PathVariable(value = "id_usuario") Long id_usuario) {
		return serviceU.listarPorId(id_usuario);
	}

	@GetMapping("/buscar/nome/{nome}")
	public ResponseEntity<List<Usuario>> listarNome(@Valid @PathVariable(value = "nome") String nome) {
		return serviceU.listarPorNome(nome);
	}

	@PutMapping("/{id_usuario}")
	public Optional<Usuario> alterarSenha(@Valid @PathVariable Long id_usuario,
			@RequestBody UsuarioDTO senhaParaAtualizar) {
		return serviceU.alterarSenha(id_usuario, senhaParaAtualizar);
	}

	@DeleteMapping("/deletar/{id_usuario}")
	public ResponseEntity<String> deletarUsuario(@Valid @PathVariable Long id_usuario) {
		return serviceU.deletarUsuario(id_usuario);
	}
}
