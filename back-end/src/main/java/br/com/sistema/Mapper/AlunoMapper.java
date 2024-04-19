package br.com.sistema.Mapper;

import br.com.sistema.DTO.AlunoDTO;
import br.com.sistema.Model.Aluno;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {TurmaMapper.class})
public interface AlunoMapper extends EntityMapper<AlunoDTO, Aluno>{

    @Mapping(target = "aulas", ignore = true)
    AlunoDTO toDto(Aluno aluno);

    @Mapping(target = "aulas", ignore = true)
    Aluno toEntity(AlunoDTO alunoDTO);


}
