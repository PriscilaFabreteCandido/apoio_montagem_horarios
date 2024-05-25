package br.com.sistema.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class HistoricoAulaDTO {

    private Long id;

    private String usuario;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT-3")
    private Date dataHoraModificacao;

    private String descricao;
}
