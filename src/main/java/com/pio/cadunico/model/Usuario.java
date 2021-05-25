package com.pio.CadUnico.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "Nome não deve estar em branco ou nulo.")
	@Size(max=255, message = "Nome deve conter no máximo 255 caracteres")
	@Column(name="NME_USUARIO")
	private String nome;
	
	@NotBlank(message = "Email não deve estar em branco ou nulo.")
	@Email(message = "Email deve estar no formato correto. Ex: exemplo@exemplo.com")
	@Size(max=255, message = "Email deve conter no máximo 255 caracteres")
	@Column(name = "DSC_EMAIL")
	private String email;
	
	@NotBlank(message = "CPF não deve estar em branco ou nulo.")
	@Size(min=11, max=11, message = "CPF deve conter 11 caracteres")
	@Column(name = "COD_CPF")
	private String cpf;
	
	@NotBlank(message = "Senha não deve estar em branco ou nulo.")
	@Size(max=255, message = "Senha deve conter no máximo 255 caracteres")
	@Column(name="DSC_SENHA")
	private String senha;
	
	@NotBlank(message = "Situação não deve estar em branco ou nulo.")
	@Column(name="DSC_SITUACAO")
	private String situacao;
	
	@Column(name="DTA_CRIACAO", nullable = false)
	private LocalDate dataCriacao;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getSituacao() {
		return situacao;
	}

	public void setSituacao(String situacao) {
		this.situacao = situacao;
	}

	public LocalDate getDataCriacao() {
		return dataCriacao;
	}

	public void setDataCriacao(LocalDate dataCriacao) {
		this.dataCriacao = dataCriacao;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
}
