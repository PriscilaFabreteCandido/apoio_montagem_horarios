package br.com.sistema.Mapper;

import br.com.sistema.DTO.AlunoDTO;
import br.com.sistema.Model.Aluno;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AlunoMapper extends EntityMapper<AlunoDTO, Aluno>{

    @Mapping(target = "turma.alunos", ignore = true)
    AlunoDTO toDto(Aluno aluno);
}
