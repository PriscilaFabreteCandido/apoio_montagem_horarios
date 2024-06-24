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

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface AulaRepository extends JpaRepository<Aula, Long> {


    @Query("SELECT DISTINCT a FROM Aula a " +
            "JOIN FETCH a.periodoAcademico p " +
            "JOIN a.alunos al " +
            "JOIN a.professor pr " +
            "WHERE al.matricula = :matricula OR pr.matricula = :matricula " + // Adicione um espaço aqui
            "AND p.formato = :formato " +
            "AND p.periodo = :periodo " +
            "AND p.ano = :ano")
    List<Aula> findAulasByMatriculaAndPeriodoAcademico(@Param("matricula") String matricula,
                                                       @Param("formato") FormatoAcademicoEnum formato,
                                                       @Param("periodo") PeriodoSemestreEnum periodo,
                                                       @Param("ano") int ano);




    @Query("SELECT a FROM Aula a " +
            "JOIN a.horarios h " +
            "WHERE a.diaSemana = :diaSemana " +
            "AND h IN :horarios " +
            "AND a.local.id = :localId")
    List<Aula> findConflitingAulasByLocal(@Param("diaSemana") String diaSemana,
                                          @Param("horarios") List<HorarioAula> horarios,
                                          @Param("localId") Long localId);

    @Query("SELECT a FROM Aula a " +
            "JOIN a.horarios h " +
            "WHERE a.diaSemana = :diaSemana " +
            "AND h IN :horarios " +
            "AND a.professor.id = :professorId")
    List<Aula> findConflitingAulasByProfessor(@Param("diaSemana") String diaSemana,
                                              @Param("horarios") List<HorarioAula> horarios,
                                              @Param("professorId") Long professorId);


    @Query("SELECT a FROM Aula a " +
            "JOIN FETCH a.horarios h " +
            "LEFT JOIN a.alunos al " +
            "LEFT JOIN a.professor pf " +
            "WHERE (al.matricula = :matricula OR pf.matricula = :matricula) " +
            "AND a.diaSemana = :diaSemana " +
            "AND (h.horaInicio > :currentTime OR (h.horaInicio = :currentTime AND h.horaFim > :currentTime)) " +
            "ORDER BY h.horaInicio")
    List<Aula> findProximaAulaByMatriculaAndDayOfWeek(@Param("matricula") String matricula,
                                                      @Param("diaSemana") String diaSemana,
                                                      @Param("currentTime") Date currentTime);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
            "FROM Aula a " +
            "WHERE a.professor.id = :professorId")
    boolean existsAulasByProfessorId(@Param("professorId") Long professorId);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
            "FROM Aula a " +
            "WHERE a.disciplina.id = :disciplinaId")
    boolean existsAulasByDisciplinaId(@Param("disciplinaId") Long disciplinaId);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
            "FROM Aula a " +
            "WHERE a.local.id = :localId")
    boolean existsAulasByLocalId(@Param("localId") Long localId);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
            "FROM Aula a " +
            "WHERE a.periodoAcademico.id = :periodoAcademicoId")
    boolean existsAulasByPeriodoAcademicoId(@Param("periodoAcademicoId") Long periodoAcademicoId);
}
