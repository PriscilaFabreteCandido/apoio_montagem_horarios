package br.com.sistema.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.util.Date;

@Data
public class EventoDTO {

    private Long id;
    private String descricao;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT-3")
    private Date data;

    private LocalDTO local;

    @JsonFormat(pattern = "HH:mm", timezone = "GMT-3")
    private Date horaInicio;

    @JsonFormat(pattern = "HH:mm", timezone = "GMT-3")
    private Date horaFim;


}
