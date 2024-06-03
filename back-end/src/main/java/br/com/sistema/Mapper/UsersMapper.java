package br.com.sistema.Mapper;

import br.com.sistema.DTO.UsersDTO;
import br.com.sistema.Model.Usuario;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsersMapper extends EntityMapper<UsersDTO, Usuario> {
}
