package br.com.sistema.Email;

import br.com.sistema.Enum.StatusEmail;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Email {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String source;

    @Column
    private String target;

    @Column
    private String subject;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Temporal(TemporalType.TIMESTAMP)
    private Date sendingDate;

    @Enumerated(EnumType.STRING)
    private StatusEmail statusEmail;
}
