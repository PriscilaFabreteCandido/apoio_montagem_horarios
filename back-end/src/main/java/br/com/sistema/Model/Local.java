package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Local {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String descricao;

    @Column
    private Integer capacidade;

    @OneToMany(mappedBy = "local", cascade = CascadeType.ALL)
    private List<LocalEquipamento> localEquipamentos = new ArrayList<>();

}