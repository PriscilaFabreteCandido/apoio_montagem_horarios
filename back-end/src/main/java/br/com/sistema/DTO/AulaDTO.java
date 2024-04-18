package br.com.sistema.DTO;

import br.com.sistema.Model.Disciplina;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class AulaDTO {

    private Long id;

    private String diaSemana;

    private List<HorarioAulaDTO> horarios;

    private Integer numeroAulas;

    private TurmaDTO turma;

    private LocalDTO local;

    private ProfessorDTO professor;

    private DisciplinaDTO disciplina;

    private PeriodoAcademicoDTO periodoAcademico;

    private List<AlunoDTO> alunos;
}
