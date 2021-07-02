package com.sucateria.sucateriaProjeto.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sucateria.sucateriaProjeto.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	public List<Usuario> findByNomeContainingIgnoreCase (String nome);
	
	public enum tipoUsuario {
		SUCATERIA, CONDONIME
	}
}
