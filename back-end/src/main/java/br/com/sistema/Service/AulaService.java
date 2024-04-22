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

    private Long idProfessorAux = 0L;

    public AulaDTO create(AulaDTO aulaDTO){

        periodoAcademicoService.validate(aulaDTO.getPeriodoAcademico());

        Aula entity = mapper.toEntity(aulaDTO);

        validateAulaConflict(entity);

        repository.save(entity);

        return mapper.toDto(entity);
    }

    public AulaDTO update(AulaDTO aulaDTO, Long id){
        findById(id);

        this.idProfessorAux = aulaDTO.getProfessor().getId();

        periodoAcademicoService.validate(aulaDTO.getPeriodoAcademico());

        Aula entity = mapper.toEntity(aulaDTO);

        validateAulaConflict(entity);

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
                                                                 String periodo,
                                                                 int ano) {

        FormatoAcademicoEnum formatoEnum = FormatoAcademicoEnum.valueOf(formato);
        PeriodoSemestreEnum periodoEnum = PeriodoSemestreEnum.fromDescricao(periodo);

        List<Aula> aulas = repository.findAulasByMatriculaAndPeriodoAcademico(matricula, formatoEnum, periodoEnum, ano);
        return mapper.toDto(aulas);
    }


    private void validateAulaConflict(Aula aula) {

        List<Aula> conflictingAulasByLocal = repository.findConflitingAulasByLocal(
                aula.getDiaSemana(),
                aula.getHorarios(),
                aula.getLocal().getId()
        );

        if (!conflictingAulasByLocal.isEmpty()) {
            Professor professor = conflictingAulasByLocal.get(0).getProfessor();
            if(professor.getId() != this.idProfessorAux){
                throw new BusinessException("Esse local já está alocado nesse dia e horário pelo professor: " + professor.getNome());
            }

        }

        // Verificar se o professor já está dando aula naquele horário
        List<Aula> conflictingAulasByProfessor = repository.findConflitingAulasByProfessor(
                aula.getDiaSemana(),
                aula.getHorarios(),
                aula.getProfessor().getId()
        );

        if(aula.getProfessor().getId() != this.idProfessorAux) {
            if (!conflictingAulasByProfessor.isEmpty()) {
                throw new BusinessException("Esse professor já está dando aula neste horário.");
            }
        }
    }


}
