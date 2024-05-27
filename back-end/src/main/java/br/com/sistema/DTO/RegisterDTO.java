package br.com.sistema.DTO;

import br.com.sistema.Enum.UserRole;

public record RegisterDTO(String login, String password, UserRole role) { }
