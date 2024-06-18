package br.com.sistema;

import br.com.sistema.Enum.UserRole;
import br.com.sistema.Model.Usuario;
import br.com.sistema.Repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class SistemaAcademicoApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(SistemaAcademicoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		userRepository.deleteAll();

		// INSERINDO USUARIO ADMIN
		String encryptedPassword1 = new BCryptPasswordEncoder().encode("adm123");
		Usuario newUser1 = new Usuario("adm", encryptedPassword1, UserRole.valueOf("ADMIN"));

		this.userRepository.save(newUser1);;
	}

}
