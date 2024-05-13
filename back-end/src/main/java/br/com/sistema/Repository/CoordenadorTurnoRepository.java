package br.com.sistema.Repository;

import br.com.sistema.Model.CoordenadorTurno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoordenadorTurnoRepository extends JpaRepository<CoordenadorTurno, Long> {
}
