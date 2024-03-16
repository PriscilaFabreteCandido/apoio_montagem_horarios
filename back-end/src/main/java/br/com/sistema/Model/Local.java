package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
public class Local {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String capacidade;

    @OneToMany(mappedBy = "local" , cascade = CascadeType.ALL)
    private List<Equipamento> equipamentos;
}