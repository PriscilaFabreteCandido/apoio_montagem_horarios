package br.com.sistema.DTO;

import lombok.Data;

@Data
public class DisciplinaDTO {

    private Long id;
    private String nome;

    private CursoDTO curso;

}
