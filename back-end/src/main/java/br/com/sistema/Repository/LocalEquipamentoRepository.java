package br.com.sistema.Repository;

import br.com.sistema.Model.Local;
import br.com.sistema.Model.LocalEquipamento;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalEquipamentoRepository extends JpaRepository<LocalEquipamento, Long> {
    @Transactional
    void deleteByLocal(Local local);
}
