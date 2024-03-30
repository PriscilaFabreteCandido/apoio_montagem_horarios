package br.com.sistema.DTO;

import br.com.sistema.Model.Disciplina;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class AulaDTO {

    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT-3")
    private Date data;

    @JsonFormat(pattern = "HH:mm", timezone = "GMT-3")
    private Date horaInicio;

    @JsonFormat(pattern = "HH:mm", timezone = "GMT-3")
    private Date horaFim;

    private LocalDTO local;

    private ProfessorDTO professor;

    private DisciplinaDTO disciplina;

    private PeriodoAcademicoDTO periodoAcademico;

    private List<AlunoDTO> alunos;
}
