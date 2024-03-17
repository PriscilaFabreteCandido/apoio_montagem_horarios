package br.com.sistema.Mapper;

import br.com.sistema.DTO.LocalDTO;
import br.com.sistema.Model.Local;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {LocalEquipamentoMapper.class})
public interface LocalMapper extends EntityMapper<LocalDTO, Local> {

    @Mapping(target = "localEquipamentos", source = "equipamentos")
    Local toEntity(LocalDTO dto);

    @Mapping(target = "equipamentos", source = "localEquipamentos")
    LocalDTO toDto(Local entity);
}