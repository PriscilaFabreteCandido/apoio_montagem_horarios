package br.com.sistema.Repository;

import br.com.sistema.Model.Evento;
import br.com.sistema.Model.HorarioAula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HorarioAulaRepository extends JpaRepository<HorarioAula, Long> {
}
