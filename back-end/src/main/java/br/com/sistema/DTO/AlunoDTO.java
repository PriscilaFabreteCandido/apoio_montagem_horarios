package br.com.sistema.DTO;

import lombok.Data;

@Data
public class AlunoDTO {

    private Long id;
    private String nome;
    private String matricula;

    private CursoDTO curso;

}
