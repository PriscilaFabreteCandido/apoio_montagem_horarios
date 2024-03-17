package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class LocalEquipamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer quantidade;

    @ManyToOne
    @JoinColumn(name = "local_id")
    private Local local;

    @ManyToOne
    @JoinColumn(name = "equipamento_id")
    private Equipamento equipamento;
}
