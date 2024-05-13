package br.com.sistema.Mapper;

import br.com.sistema.DTO.CoordenadorTurnoDTO;
import br.com.sistema.Model.CoordenadorTurno;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CoordenadorTurnoMapper extends EntityMapper<CoordenadorTurnoDTO, CoordenadorTurno> {
}