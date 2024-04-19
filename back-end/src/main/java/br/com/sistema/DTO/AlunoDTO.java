package br.com.sistema.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
public class AlunoDTO {

    private Long id;
    private String nome;
    private String matricula;

    @JsonIgnoreProperties("alunos")
    private TurmaDTO turma;

    private CursoDTO curso;

    @JsonIgnoreProperties("alunos")
    private List<AulaDTO> aulas;

    public AlunoDTO(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }
}
