package br.com.sistema.Controller;

import br.com.sistema.DTO.CursoDTO;
import br.com.sistema.DTO.ProfessorDTO;
import br.com.sistema.Service.CursoService;
import br.com.sistema.Service.ProfessorService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "ProfessorController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/professores")
public class ProfessorController {

    private final ProfessorService professorService;

    @PostMapping("/create")
    public ResponseEntity<ProfessorDTO> createProfessor(@RequestBody ProfessorDTO professorDTO) {
        System.out.println(professorDTO);
        return new ResponseEntity<>(professorService.create(professorDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProfessorDTO> updateProfessor(@RequestBody ProfessorDTO professorDTO, @PathVariable Long id) {
        System.out.println(professorDTO);
        return new ResponseEntity<>(professorService.update(professorDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ProfessorDTO> deleteProfessor(@PathVariable Long id) {
        professorService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<ProfessorDTO> findProfessorById(@PathVariable Long id) {
        return new ResponseEntity<>(professorService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ProfessorDTO>> findAllProfessores() {
        List<ProfessorDTO> professorDTOList = professorService.findAll();
        return new ResponseEntity<>(professorDTOList, professorDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }
}
