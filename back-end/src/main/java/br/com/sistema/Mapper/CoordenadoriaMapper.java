package br.com.sistema.Mapper;

import br.com.sistema.DTO.CoordenadoriaDTO;
import br.com.sistema.Model.Coordenadoria;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CoordenadoriaMapper extends EntityMapper<CoordenadoriaDTO, Coordenadoria> {
}
