package br.com.sistema.Mapper;

import br.com.sistema.DTO.HistoricoAulaDTO;
import br.com.sistema.Model.HistoricoAula;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HistoricoAulaMapper extends EntityMapper<HistoricoAulaDTO, HistoricoAula>{
}
