package br.com.sistema.DTO;

import lombok.Data;

@Data
public class CursoDTO {

    private Long id;
    private String nome;

    private CoordenadoriaDTO coordenadoria;

}
