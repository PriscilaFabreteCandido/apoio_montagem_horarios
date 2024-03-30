package br.com.sistema.Mapper;

import br.com.sistema.DTO.PeriodoAcademicoDTO;
import br.com.sistema.Model.PeriodoAcademico;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PeriodoAcademicoMapper extends EntityMapper<PeriodoAcademicoDTO, PeriodoAcademico>{

    @AfterMapping
    default void afterMapping(PeriodoAcademico periodoAcademico, @MappingTarget PeriodoAcademicoDTO periodoAcademicoDTO) {
        if (periodoAcademico.getPeriodo().getDescricao() != null) {
            periodoAcademicoDTO.setPeriodo(periodoAcademico.getPeriodo().getDescricao());
        }
    }
}
