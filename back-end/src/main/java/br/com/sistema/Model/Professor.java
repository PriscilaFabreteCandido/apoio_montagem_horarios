package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nome;

    @Column
    private String matricula;

    @Column
    private Boolean coordenador;

    @ManyToOne
    @JoinColumn(name = "coordenadoria_id")
    private Coordenadoria coordenadoria;

}
