package br.com.sistema.DTO;


import lombok.Data;

@Data
public class LocalEquipamentoDTO {

    private EquipamentoDTO equipamento;
    private Integer quantidade;

}