package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Coordenadoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String descricao;

    @OneToMany(mappedBy = "coordenadoria", cascade = CascadeType.ALL)
    private List<Professor> professores = new ArrayList<>();

    @OneToOne
    private Curso curso;

}
