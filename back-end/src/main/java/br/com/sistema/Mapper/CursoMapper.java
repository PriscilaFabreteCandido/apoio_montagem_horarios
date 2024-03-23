package br.com.sistema.Mapper;

import br.com.sistema.DTO.CursoDTO;
import br.com.sistema.Model.Curso;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CursoMapper extends EntityMapper<CursoDTO, Curso> {
}
