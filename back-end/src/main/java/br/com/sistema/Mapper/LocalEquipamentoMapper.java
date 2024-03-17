package br.com.sistema.Mapper;

import br.com.sistema.DTO.LocalEquipamentoDTO;
import br.com.sistema.Model.LocalEquipamento;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LocalEquipamentoMapper extends EntityMapper<LocalEquipamentoDTO, LocalEquipamento> {
}