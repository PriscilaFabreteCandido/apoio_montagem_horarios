package br.com.sistema.DTO;

import lombok.Data;

@Data
public class ProfessorDTO {

    private Long id;
    private String nome;
    private String matricula;
    private Boolean coordenador;

    private CoordenadoriaDTO coordenadoria;

}
