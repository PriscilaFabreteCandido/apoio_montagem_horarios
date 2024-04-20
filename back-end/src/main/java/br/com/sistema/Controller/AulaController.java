package br.com.sistema.Controller;

import br.com.sistema.DTO.AlunoDTO;
import br.com.sistema.DTO.AulaDTO;
import br.com.sistema.Enum.FormatoAcademicoEnum;
import br.com.sistema.Enum.PeriodoSemestreEnum;
import br.com.sistema.Service.AlunoService;
import br.com.sistema.Service.AulaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "AulaController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/aulas")
public class AulaController {

    private final AulaService aulaService;

    @PostMapping("/create")
    public ResponseEntity<AulaDTO> createAula(@RequestBody AulaDTO aulaDTO) {
        System.out.println(aulaDTO);
        return new ResponseEntity<>(aulaService.create(aulaDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AulaDTO> updateAula(@RequestBody AulaDTO aulaDTO, @PathVariable Long id) {
        System.out.println(aulaDTO);
        return new ResponseEntity<>(aulaService.update(aulaDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<AulaDTO> deleteAula(@PathVariable Long id) {
        aulaService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<AulaDTO> findAulaById(@PathVariable Long id) {
        return new ResponseEntity<>(aulaService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<AulaDTO>> findAllAulas() {
        List<AulaDTO> aulaDTOList = aulaService.findAll();
        return new ResponseEntity<>(aulaDTOList, aulaDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }

    @GetMapping("/aluno/{matricula}/{formato}/{periodo}")
    public ResponseEntity<List<AulaDTO>> findAulasByMatriculaAndPeriodoAcademico(
            @PathVariable String matricula,
            @PathVariable String formato,
            @PathVariable String periodo) {
        List<AulaDTO> aulas = aulaService.findAulasByMatriculaAndPeriodoAcademico(matricula, formato, periodo);
        System.out.println("Mostrando dados: " + aulas);
        return new ResponseEntity<>(aulas, HttpStatus.OK);
    }

}
