package br.com.sistema.Controller;

import br.com.sistema.DTO.CoordenadoriaDTO;
import br.com.sistema.DTO.CursoDTO;
import br.com.sistema.Service.CoordenadoriaService;
import br.com.sistema.Service.CursoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "CursoController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cursos")
public class CursoController {

    private final CursoService cursoService;

    @PostMapping("/create")
    public ResponseEntity<CursoDTO> createCurso(@RequestBody CursoDTO cursoDTO) {
        return new ResponseEntity<>(cursoService.create(cursoDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CursoDTO> updateCurso(@RequestBody CursoDTO cursoDTO, @PathVariable Long id) {
        System.out.println(cursoDTO);
        return new ResponseEntity<>(cursoService.update(cursoDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CursoDTO> deleteCurso(@PathVariable Long id) {
        cursoService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<CursoDTO> findCursoById(@PathVariable Long id) {
        return new ResponseEntity<>(cursoService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<CursoDTO>> findAllCursos() {
        List<CursoDTO> cursoDTOList = cursoService.findAll();
        return new ResponseEntity<>(cursoDTOList, cursoDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }
}
