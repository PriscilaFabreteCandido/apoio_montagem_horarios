package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Equipamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String descricao;

    @OneToMany(mappedBy = "equipamento", cascade = CascadeType.ALL)
    private List<LocalEquipamento> localEquipamentos;
}
