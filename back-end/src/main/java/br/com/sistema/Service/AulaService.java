package br.com.sistema.Service;

import br.com.sistema.DTO.*;
import br.com.sistema.Enum.FormatoAcademicoEnum;
import br.com.sistema.Enum.PeriodoSemestreEnum;
import br.com.sistema.Exception.BusinessException;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.AulaMapper;
import br.com.sistema.Mapper.DisciplinaMapper;
import br.com.sistema.Model.*;
import br.com.sistema.Repository.AulaRepository;
import br.com.sistema.Repository.DisciplinaRepository;
import br.com.sistema.Repository.PeriodoAcademicoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AulaService {

    private final AulaRepository repository;
    private final AulaMapper mapper;

    private final PeriodoAcademicoService periodoAcademicoService;

    public AulaDTO create(AulaDTO aulaDTO){

        periodoAcademicoService.validate(aulaDTO.getPeriodoAcademico());

        Aula entity = mapper.toEntity(aulaDTO);

        validateAulaConflict(entity);

        repository.save(entity);

        return mapper.toDto(entity);
    }

    public AulaDTO update(AulaDTO aulaDTO, Long id){
        findById(id);

        periodoAcademicoService.validate(aulaDTO.getPeriodoAcademico());

        Aula entity = mapper.toEntity(aulaDTO);

        //validateExistingAula(entity);

        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        Aula aula = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aula com ID '" + id + "' não encontrado."));

        repository.delete(aula);
    }


    //=============================================================================================

    public AulaDTO findById(Long id){
        Aula entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aula com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<AulaDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }

    public List<AulaDTO> findAulasByMatriculaAndPeriodoAcademico(String matricula,
                                                                 String formato,
                                                                 String periodo) {

        FormatoAcademicoEnum formatoEnum = FormatoAcademicoEnum.valueOf(formato);
        PeriodoSemestreEnum periodoEnum = PeriodoSemestreEnum.fromDescricao(periodo);

        List<Aula> aulas = repository.findAulasByMatriculaAndPeriodoAcademico(matricula, formatoEnum, periodoEnum);
        return mapper.toDto(aulas);
    }

    private void validateAulaConflict(Aula aula) {
        List<Aula> conflitingAulas = repository.findConflitingAulas(
                aula.getDiaSemana(),
                aula.getHorarios(),
                aula.getProfessor().getId(),
                aula.getLocal().getId()
        );

        if (!conflitingAulas.isEmpty()) {
            throw new BusinessException("Existe um conflito de horários, ou professor ou o local já estão alocados nesse dia.");
        }
    }
}
