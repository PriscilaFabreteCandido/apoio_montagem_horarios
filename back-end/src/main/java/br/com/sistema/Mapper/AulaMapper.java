package br.com.sistema.Mapper;

import br.com.sistema.DTO.AulaDTO;
import br.com.sistema.Model.Aula;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AulaMapper extends EntityMapper<AulaDTO, Aula>{
}
