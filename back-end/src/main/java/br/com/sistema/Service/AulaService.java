package br.com.sistema.Service;

import br.com.sistema.Controller.HistoricoAulaController;
import br.com.sistema.DTO.AulaDTO;
import br.com.sistema.DTO.HistoricoAulaDTO;
import br.com.sistema.Enum.FormatoAcademicoEnum;
import br.com.sistema.Enum.PeriodoSemestreEnum;
import br.com.sistema.Exception.BusinessException;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.AulaMapper;
import br.com.sistema.Model.Aula;
import br.com.sistema.Model.Professor;
import br.com.sistema.Repository.AulaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AulaService {

    private final AulaRepository repository;
    private final AulaMapper mapper;
    private final PeriodoAcademicoService periodoAcademicoService;
    private final HistoricoAulaController historicoAulaController;
    private Long idProfessorAux = 0L;

    public AulaDTO create(AulaDTO aulaDTO){
        periodoAcademicoService.validate(aulaDTO.getPeriodoAcademico());
        Aula entity = mapper.toEntity(aulaDTO);
        validateAulaConflict(entity);
        repository.save(entity);
        String logMessage = String.format("Aula criada para o professor '%s' na '%s' em '%s'.",
                aulaDTO.getProfessor().getNome(), aulaDTO.getDiaSemana(), aulaDTO.getLocal().getDescricao());
        createLog(logMessage);
        return mapper.toDto(entity);
    }

    public AulaDTO update(AulaDTO aulaDTO, Long id){
        AulaDTO antigo = findById(id);
        this.idProfessorAux = aulaDTO.getProfessor().getId();
        periodoAcademicoService.validate(aulaDTO.getPeriodoAcademico());
        Aula entity = mapper.toEntity(aulaDTO);
        validateAulaConflict(entity);
        entity.setId(id);
        repository.save(entity);

        AulaDTO dto = mapper.toDto(entity);
        String logMessage = String.format(
                "Aula do professor '%s' na '%s' em '%s' alterada para o professor '%s' na '%s' em '%s'.",
                antigo.getProfessor().getNome(), antigo.getDiaSemana(), antigo.getLocal().getDescricao(),
                dto.getProfessor().getNome(), dto.getDiaSemana(), dto.getLocal().getDescricao()
        );
        createLog(logMessage);
        return dto;
    }

    public void delete(Long id) {
        AulaDTO aulaDTO = findById(id);
        System.out.println(aulaDTO);
        repository.deleteById(id);
        String logMessage = String.format("Aula do professor '%s' na '%s' em '%s' excluída.",
                aulaDTO.getProfessor().getNome(), aulaDTO.getDiaSemana(), aulaDTO.getLocal().getDescricao());
        createLog(logMessage);
    }

    public AulaDTO findById(Long id){
        Aula entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aula com id '" + id + "' não encontrada."));
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

    private String converterParaPortugues(String dayOfWeek) {
        switch (dayOfWeek) {
            case "MONDAY":
                return "SEGUNDA-FEIRA";
            case "TUESDAY":
                return "TERÇA-FEIRA";
            case "WEDNESDAY":
                return "QUARTA-FEIRA";
            case "THURSDAY":
                return "QUINTA-FEIRA";
            case "FRIDAY":
                return "SEXTA-FEIRA";
            case "SATURDAY":
                return "SÁBADO";
            case "SUNDAY":
                return "DOMINGO";
            default:
                throw new IllegalArgumentException("Dia da semana inválido: " + dayOfWeek);
        }
    }

    public AulaDTO findProximaAulaByMatricula(String matricula) {
        LocalDateTime now = LocalDateTime.now();
        DayOfWeek currentDay = now.getDayOfWeek();
        String currentDayString = converterParaPortugues(currentDay.toString());
        Date currentTime = java.sql.Timestamp.valueOf(now);
        List<Aula> aulas = repository.findProximaAulaByMatriculaAndDayOfWeek(matricula, currentDayString, currentTime);
        if (aulas.isEmpty()) {
            throw new EntityNotFoundException("Não há aulas futuras para o aluno com matrícula '" + matricula + "'.");
        }
        Aula proximaAula = aulas.get(0);
        return mapper.toDto(proximaAula);
    }

    private void createLog(String descricao){
        HistoricoAulaDTO historicoAulaDTO = new HistoricoAulaDTO();
        historicoAulaDTO.setUsuario("Fulano");
        historicoAulaDTO.setDataHoraModificacao(new Date());
        historicoAulaDTO.setDescricao(descricao);
        historicoAulaController.createHistoricoAula(historicoAulaDTO);
    }

    private String formatarData(Date data){
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        return sdf.format(data);
    }

    private String formatarHora(Date hora){
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        return sdf.format(hora);
    }
}
