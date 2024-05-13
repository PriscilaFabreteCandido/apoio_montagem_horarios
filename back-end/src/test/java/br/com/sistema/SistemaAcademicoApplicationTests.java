package br.com.sistema;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.DayOfWeek;
import java.time.LocalDate;

@SpringBootTest
class SistemaAcademicoApplicationTests {

	private String converterParaPortugues(String dayOfWeek) {
		switch (dayOfWeek) {
			case "MONDAY":
				return "SEGUNDA-FEIRA";
			case "TUESDAY":
				return "TERÇA-FEIRA";
			case "WEDNESDAY":
				return "QUARTA-FEIRA";
			case "THURSDAY":
				return "QUINTA-FEIRA";
			case "FRIDAY":
				return "SEXTA-FEIRA";
			case "SATURDAY":
				return "SÁBADO";
			case "SUNDAY":
				return "DOMINGO";
			default:
				throw new IllegalArgumentException("Dia da semana inválido: " + dayOfWeek);
		}
	}

	@Test
	void contextLoads() {
		LocalDate hoje = LocalDate.now();

		DayOfWeek diaDaSemana = hoje.getDayOfWeek();
		System.out.println(converterParaPortugues(diaDaSemana.toString()));
	}

}
