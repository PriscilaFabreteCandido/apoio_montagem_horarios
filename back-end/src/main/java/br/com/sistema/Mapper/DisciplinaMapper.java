package br.com.sistema.Mapper;

import br.com.sistema.DTO.DisciplinaDTO;
import br.com.sistema.Model.Disciplina;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DisciplinaMapper extends EntityMapper<DisciplinaDTO, Disciplina>{
}
