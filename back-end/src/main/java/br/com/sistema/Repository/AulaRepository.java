package br.com.sistema.Repository;

import br.com.sistema.Enum.FormatoAcademicoEnum;
import br.com.sistema.Enum.PeriodoSemestreEnum;
import br.com.sistema.Model.Aula;
import br.com.sistema.Model.HorarioAula;
import br.com.sistema.Model.Local;
import br.com.sistema.Model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AulaRepository extends JpaRepository<Aula, Long> {


    @Query("SELECT DISTINCT a FROM Aula a " +
            "JOIN FETCH a.periodoAcademico p " +
            "JOIN a.alunos al " +
            "WHERE al.matricula = :matricula " +
            "AND p.formato = :formato " +
            "AND p.periodo = :periodo")
    List<Aula> findAulasByMatriculaAndPeriodoAcademico(@Param("matricula") String matricula,
                                                       @Param("formato") FormatoAcademicoEnum formato,
                                                       @Param("periodo") PeriodoSemestreEnum periodo);


    @Query("SELECT a FROM Aula a " +
            "JOIN a.horarios h " +
            "WHERE a.diaSemana = :diaSemana " +
            "AND h IN :horarios " +
            "AND a.professor.id = :professorId " +
            "AND a.local.id = :localId")
    List<Aula> findConflitingAulas(@Param("diaSemana") String diaSemana,
                                   @Param("horarios") List<HorarioAula> horarios,
                                   @Param("professorId") Long professorId,
                                   @Param("localId") Long localId);


}
