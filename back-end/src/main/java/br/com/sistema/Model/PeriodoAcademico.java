package br.com.sistema.Model;

import br.com.sistema.Enum.FormatoAcademicoEnum;
import br.com.sistema.Enum.PeriodoSemestreEnum;

import java.util.Date;

public class PeriodoAcademico {

    private Long id;
    private Integer ano;
    private Date dataInicio;
    private Date dataFim;
    private FormatoAcademicoEnum formato;
    private PeriodoSemestreEnum periodo;
}
