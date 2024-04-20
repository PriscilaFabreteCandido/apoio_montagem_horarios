package br.com.sistema.Controller;

import br.com.sistema.DTO.AlunoDTO;
import br.com.sistema.DTO.CoordenadoriaDTO;
import br.com.sistema.Service.AlunoService;
import br.com.sistema.Service.CoordenadoriaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "AlunoController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/alunos")
public class AlunoController {

    private final AlunoService alunoService;

    @PostMapping("/create")
    public ResponseEntity<AlunoDTO> createAluno(@RequestBody AlunoDTO alunoDTO) {
        System.out.println(alunoDTO);
        return new ResponseEntity<>(alunoService.create(alunoDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AlunoDTO> updateAluno(@RequestBody AlunoDTO alunoDTO, @PathVariable Long id) {
        System.out.println(alunoDTO);
        return new ResponseEntity<>(alunoService.update(alunoDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<AlunoDTO> deleteAluno(@PathVariable Long id) {
        alunoService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<AlunoDTO> findAlunoById(@PathVariable Long id) {
        return new ResponseEntity<>(alunoService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<AlunoDTO>> findAllAlunos() {
        List<AlunoDTO> alunoDTOList = alunoService.findAll();
        return new ResponseEntity<>(alunoDTOList, alunoDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }

    @GetMapping("/matricula/{matricula}")
    public ResponseEntity<AlunoDTO> findAlunoByMatricula(@PathVariable String matricula) {
        System.out.println("Mostrando aluno: " + alunoService.findAlunoByMatricula(matricula));
        return new ResponseEntity<>(alunoService.findAlunoByMatricula(matricula), HttpStatus.OK);
    }

}