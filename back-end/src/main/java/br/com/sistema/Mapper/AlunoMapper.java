package br.com.sistema.Mapper;

import br.com.sistema.DTO.AlunoDTO;
import br.com.sistema.Model.Aluno;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AlunoMapper extends EntityMapper<AlunoDTO, Aluno>{
}
