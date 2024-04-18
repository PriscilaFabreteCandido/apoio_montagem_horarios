package br.com.sistema.Mapper;

import br.com.sistema.DTO.AlunoDTO;
import br.com.sistema.DTO.ProfessorDTO;
import br.com.sistema.DTO.TurmaDTO;
import br.com.sistema.Model.Aluno;
import br.com.sistema.Model.Professor;
import br.com.sistema.Model.Turma;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface TurmaMapper extends EntityMapper<TurmaDTO, Turma> {

    @Mapping(target = "alunos", expression = "java(mapAlunos(turma))")
    TurmaDTO toDto(Turma turma);

    default List<AlunoDTO> mapAlunos(Turma turma) {
        return turma.getAlunos() != null ?
                turma.getAlunos().stream().map(this::mapToAlunoDTO).collect(Collectors.toList()) :
                Collections.emptyList();
    }

    default AlunoDTO mapToAlunoDTO(Aluno aluno) {
        return new AlunoDTO(aluno.getId(), aluno.getNome());
    }
}