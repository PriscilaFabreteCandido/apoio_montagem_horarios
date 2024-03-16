package br.com.sistema.Mapper;

import br.com.sistema.DTO.LocalDTO;
import br.com.sistema.Model.Local;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LocalMapper extends EntityMapper<LocalDTO, Local> {
}
