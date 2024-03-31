package br.com.sistema.Model;

import br.com.sistema.DTO.CursoDTO;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Disciplina {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nome;

    @ManyToOne
    @JoinColumn(name = "curso_id")
    private Curso curso;

}
