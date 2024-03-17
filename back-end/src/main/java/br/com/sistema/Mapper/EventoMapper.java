package br.com.sistema.Mapper;

import br.com.sistema.DTO.EventoDTO;
import br.com.sistema.Model.Evento;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EventoMapper extends EntityMapper<EventoDTO, Evento>{
}
