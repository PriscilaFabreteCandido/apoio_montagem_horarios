package br.com.sistema.Repository;

import br.com.sistema.Model.Coordenadoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoordenadoriaRepository extends JpaRepository<Coordenadoria, Long> {
}
