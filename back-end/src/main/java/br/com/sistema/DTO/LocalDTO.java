package br.com.sistema.DTO;

import lombok.Data;
import java.util.List;

@Data
public class LocalDTO {

    private Long id;
    private String descricao;
    private Integer capacidade;
    private List<LocalEquipamentoDTO> equipamentos;
}
