package br.com.sistema.Mapper;

import br.com.sistema.DTO.ProfessorDTO;
import br.com.sistema.DTO.TurmaDTO;
import br.com.sistema.Model.Professor;
import br.com.sistema.Model.Turma;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TurmaMapper extends EntityMapper<TurmaDTO, Turma> {
}
