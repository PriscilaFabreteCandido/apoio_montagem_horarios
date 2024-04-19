package br.com.sistema.Mapper;

import br.com.sistema.DTO.AlunoDTO;
import br.com.sistema.DTO.ProfessorDTO;
import br.com.sistema.DTO.TurmaDTO;
import br.com.sistema.Model.Aluno;
import br.com.sistema.Model.Professor;
import br.com.sistema.Model.Turma;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TurmaMapper extends EntityMapper<TurmaDTO, Turma> {

    @Mapping(target = "alunos", ignore = true) // Ignora o atributo turma dentro de cada aluno
    TurmaDTO toDto(Turma turma);

    @Mapping(target = "alunos", ignore = true)
    Turma toEntity(TurmaDTO turmaDTO);
}