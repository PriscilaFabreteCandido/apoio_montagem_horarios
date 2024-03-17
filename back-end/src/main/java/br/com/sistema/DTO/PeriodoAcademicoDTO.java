package br.com.sistema.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class PeriodoAcademicoDTO {

    private Long id;
    private Integer ano;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT-3")
    private Date dataInicio;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT-3")
    private Date dataFim;

    private String formato;
    private String periodo;

}
