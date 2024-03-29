package br.com.sistema.Controller;

import br.com.sistema.DTO.AlunoDTO;
import br.com.sistema.DTO.DisciplinaDTO;
import br.com.sistema.Service.AlunoService;
import br.com.sistema.Service.DisciplinaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "DisciplinaController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/disciplinas")
public class DisciplinaController {

    private final DisciplinaService disciplinaService;

    @PostMapping("/create")
    public ResponseEntity<DisciplinaDTO> createDisciplina(@RequestBody DisciplinaDTO disciplinaDTO) {
        System.out.println(disciplinaDTO);
        return new ResponseEntity<>(disciplinaService.create(disciplinaDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DisciplinaDTO> updateDisciplina(@RequestBody DisciplinaDTO disciplinaDTO, @PathVariable Long id) {
        System.out.println(disciplinaDTO);
        return new ResponseEntity<>(disciplinaService.update(disciplinaDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<DisciplinaDTO> deleteDisciplina(@PathVariable Long id) {
        disciplinaService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<DisciplinaDTO> findDisciplinaById(@PathVariable Long id) {
        return new ResponseEntity<>(disciplinaService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<DisciplinaDTO>> findAllDisciplinas () {
        List<DisciplinaDTO> disciplinaDTOList = disciplinaService.findAll();
        return new ResponseEntity<>(disciplinaDTOList, disciplinaDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }

}