package br.com.sistema.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class HorarioAulaDTO {

    private Long id;

    @JsonFormat(pattern = "HH:mm", timezone = "GMT-3")
    private Date horaInicio;

    @JsonFormat(pattern = "HH:mm", timezone = "GMT-3")
    private Date horaFim;
}
