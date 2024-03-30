package br.com.sistema.Mapper;

import br.com.sistema.DTO.AulaDTO;
import br.com.sistema.DTO.PeriodoAcademicoDTO;
import br.com.sistema.Model.Aula;
import br.com.sistema.Model.PeriodoAcademico;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AulaMapper extends EntityMapper<AulaDTO, Aula>{

    @AfterMapping
    default void afterMapping(Aula aula, @MappingTarget AulaDTO aulaDTO) {
        if(aula.getPeriodoAcademico().getPeriodo().getDescricao() != null){
            aulaDTO.getPeriodoAcademico().setPeriodo(aula.getPeriodoAcademico().getPeriodo().getDescricao());
        }
    }

}
