package br.com.sistema.Repository;

import br.com.sistema.Model.PeriodoAcademico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeriodoAcademicoRepository extends JpaRepository<PeriodoAcademico, Long> {
}
