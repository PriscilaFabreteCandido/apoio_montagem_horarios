package br.com.sistema.Repository;

import br.com.sistema.Model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    boolean existsByMatricula(String matricula);
    Professor findByMatricula(String matricula);
}
