package br.com.sistema.Email;

import br.com.sistema.Enum.StatusEmail;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class EmailDTO {

    private Long id;

    @Email
    private String source;

    @Email
    private String target;

    @NotBlank
    private String subject;

    @NotBlank
    private String message;

    private Date sendingDate;

    private StatusEmail statusEmail;

    private MultipartFile attachment;
}
