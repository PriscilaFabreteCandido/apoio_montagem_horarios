package br.com.sistema.Repository;

import br.com.sistema.Model.HistoricoAula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricoAulaRepository extends JpaRepository<HistoricoAula, Long> {
}
