package br.com.sistema.Mapper;

import br.com.sistema.DTO.AlunoDTO;
import br.com.sistema.DTO.AulaDTO;
import br.com.sistema.Model.Aluno;
import br.com.sistema.Model.Aula;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {AlunoMapper.class, TurmaMapper.class})
public interface AulaMapper extends EntityMapper<AulaDTO, Aula>{


    @AfterMapping
    default void afterMapping(Aula aula, @MappingTarget AulaDTO aulaDTO) {
        if(aula.getPeriodoAcademico().getPeriodo().getDescricao() != null){
            aulaDTO.getPeriodoAcademico().setPeriodo(aula.getPeriodoAcademico().getPeriodo().getDescricao());
        }
    }
}
