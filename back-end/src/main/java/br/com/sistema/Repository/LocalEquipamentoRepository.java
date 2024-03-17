package br.com.sistema.Repository;

import br.com.sistema.Model.LocalEquipamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalEquipamentoRepository extends JpaRepository<LocalEquipamento, Long> {
}
