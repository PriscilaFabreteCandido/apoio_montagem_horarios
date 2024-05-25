package br.com.sistema.Controller;

import br.com.sistema.DTO.CoordenadoriaDTO;
import br.com.sistema.DTO.HistoricoAulaDTO;
import br.com.sistema.Service.CoordenadoriaService;
import br.com.sistema.Service.HistoricoAulaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "HistoricoAulaController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/historico-aulas")
public class HistoricoAulaController {

    private final HistoricoAulaService historicoAulaService;

    @PostMapping("/create")
    public ResponseEntity<HistoricoAulaDTO> createHistoricoAula(@RequestBody HistoricoAulaDTO historicoAulaDTO) {
        return new ResponseEntity<>(historicoAulaService.create(historicoAulaDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<HistoricoAulaDTO> updateHistoricoAula(@RequestBody HistoricoAulaDTO historicoAulaDTO, @PathVariable Long id) {
        System.out.println(historicoAulaDTO);
        return new ResponseEntity<>(historicoAulaService.update(historicoAulaDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HistoricoAulaDTO> deleteHistoricoAula(@PathVariable Long id) {
        historicoAulaService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<HistoricoAulaDTO> findHistoricoAulaById(@PathVariable Long id) {
        return new ResponseEntity<>(historicoAulaService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<HistoricoAulaDTO>> findAllHistoricoAulas() {
        List<HistoricoAulaDTO> historicoAulaDTOList = historicoAulaService.findAll();
        return new ResponseEntity<>(historicoAulaDTOList, historicoAulaDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }
}
