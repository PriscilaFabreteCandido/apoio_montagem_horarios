package br.com.sistema.Email;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "EmailController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/emails")
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/send-email")
    public ResponseEntity<EmailDTO> sendEmailWithAttachment(
            @RequestParam String source,
            @RequestParam String target,
            @RequestParam String subject,
            @RequestParam String message,
            @RequestParam MultipartFile attachment) {

        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setSource(source);
        emailDTO.setTarget(target);
        emailDTO.setSubject(subject);
        emailDTO.setMessage(message);
        emailDTO.setAttachment(attachment);

        System.out.println(emailDTO);

        return new ResponseEntity<>(emailService.sendEmail(emailDTO), HttpStatus.CREATED);
    }

}
