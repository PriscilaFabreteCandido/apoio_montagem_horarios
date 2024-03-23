package br.com.sistema.Mapper;

import br.com.sistema.DTO.ProfessorDTO;
import br.com.sistema.Model.Professor;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProfessorMapper extends EntityMapper<ProfessorDTO, Professor> {
}
