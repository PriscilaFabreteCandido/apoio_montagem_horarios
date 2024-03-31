package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nome;

    @ManyToOne
    @JoinColumn(name = "coordenadoria_id")
    private Coordenadoria coordenadoria;

    @OneToMany(mappedBy = "curso")
    private List<Disciplina> disciplinas = new ArrayList<>();

    @OneToMany(mappedBy = "curso")
    private List<Aluno> alunos = new ArrayList<>();
}
