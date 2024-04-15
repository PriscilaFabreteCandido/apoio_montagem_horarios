package br.com.sistema.Controller;

import br.com.sistema.DTO.CursoDTO;
import br.com.sistema.DTO.ProfessorDTO;
import br.com.sistema.DTO.TurmaDTO;
import br.com.sistema.Service.CursoService;
import br.com.sistema.Service.ProfessorService;
import br.com.sistema.Service.TurmaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "TurmaController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/turmas")
public class TurmaController {

    private final TurmaService turmaService;

    @PostMapping("/create")
    public ResponseEntity<TurmaDTO> createTurma(@RequestBody TurmaDTO turmaDTO) {
        System.out.println(turmaDTO);
        return new ResponseEntity<>(turmaService.create(turmaDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TurmaDTO> updateTurma(@RequestBody TurmaDTO turmaDTO, @PathVariable Long id) {
        System.out.println(turmaDTO);
        return new ResponseEntity<>(turmaService.update(turmaDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<TurmaDTO> deleteTurma(@PathVariable Long id) {
        turmaService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<TurmaDTO> findTurmaById(@PathVariable Long id) {
        return new ResponseEntity<>(turmaService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<TurmaDTO>> findAllTurmas() {
        List<TurmaDTO> turmaDTOList = turmaService.findAll();
        return new ResponseEntity<>(turmaDTOList, turmaDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }

}
