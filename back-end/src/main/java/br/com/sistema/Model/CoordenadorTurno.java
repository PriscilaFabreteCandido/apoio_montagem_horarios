package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class CoordenadorTurno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nome;

}
