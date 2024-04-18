package br.com.sistema.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
public class TurmaDTO {

    private Long id;
    private String nome;

    @JsonIgnoreProperties("turma")
    private List<AlunoDTO> alunos;
}
