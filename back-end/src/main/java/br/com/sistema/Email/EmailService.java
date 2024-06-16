package br.com.sistema.Email;

import br.com.sistema.Enum.StatusEmail;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final EmailRepository emailRepository;
    private final EmailMapper emailMapper;
    private final JavaMailSender emailSender;

    @Value("${spring.mail.username}")
    private String source;

    public EmailDTO sendEmail(EmailDTO emailDTO) {
        Email email = emailMapper.toEntity(emailDTO);

        email.setSource(source);
        email.setSendingDate(new Date());

        try {
            // Criar a mensagem MIME
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            // Definir remetente, destinatário, assunto e corpo do email
            helper.setFrom(email.getSource());
            helper.setTo(email.getTarget());
            helper.setSubject(email.getSubject());
            helper.setText(email.getMessage());

            // Adicionar anexo
            if (emailDTO.getAttachment() != null) {
                helper.addAttachment(emailDTO.getAttachment().getOriginalFilename(),
                        new ByteArrayResource(emailDTO.getAttachment().getBytes()));
            }

            // Enviar o email
            emailSender.send(mimeMessage);

            email.setStatusEmail(StatusEmail.SENT);
        } catch (MailException | MessagingException ex) {
            email.setStatusEmail(StatusEmail.ERROR);
            ex.printStackTrace();
        } finally {
            System.out.println(email.getStatusEmail());
            return emailMapper.toDto(emailRepository.save(email));
        }
    }
}
