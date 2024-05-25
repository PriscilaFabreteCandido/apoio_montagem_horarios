package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class HistoricoAula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String usuario;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dataHoraModificacao;

    @Column
    private String descricao;

}
