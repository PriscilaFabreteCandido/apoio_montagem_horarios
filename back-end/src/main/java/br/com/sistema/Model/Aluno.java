package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nome;

    private String matricula;

    @ManyToOne
    @JoinColumn(name = "curso_id")
    private Curso curso;
}
