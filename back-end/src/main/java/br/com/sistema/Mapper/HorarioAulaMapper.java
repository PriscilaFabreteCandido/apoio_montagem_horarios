package br.com.sistema.Mapper;

import br.com.sistema.DTO.HorarioAulaDTO;
import br.com.sistema.Model.HorarioAula;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HorarioAulaMapper extends EntityMapper<HorarioAulaDTO, HorarioAula> {
}
