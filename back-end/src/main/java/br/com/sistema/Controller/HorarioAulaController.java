package br.com.sistema.Controller;

import br.com.sistema.DTO.AlunoDTO;
import br.com.sistema.DTO.AulaDTO;
import br.com.sistema.DTO.HorarioAulaDTO;
import br.com.sistema.Service.AlunoService;
import br.com.sistema.Service.AulaService;
import br.com.sistema.Service.HorarioAulaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "HorarioController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/horarios")
public class HorarioAulaController {

    private final HorarioAulaService horarioAulaService;

    @PostMapping("/create")
    public ResponseEntity<HorarioAulaDTO> createHorario(@RequestBody HorarioAulaDTO horarioAulaDTO) {
        System.out.println(horarioAulaDTO);
        return new ResponseEntity<>(horarioAulaService.create(horarioAulaDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<HorarioAulaDTO> updateHorario(@RequestBody HorarioAulaDTO horarioAulaDTO, @PathVariable Long id) {
        System.out.println(horarioAulaDTO);
        return new ResponseEntity<>(horarioAulaService.update(horarioAulaDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HorarioAulaDTO> deleteHorario(@PathVariable Long id) {
        horarioAulaService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<HorarioAulaDTO> findHorarioById(@PathVariable Long id) {
        return new ResponseEntity<>(horarioAulaService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<HorarioAulaDTO>> findAllHorarios() {
        List<HorarioAulaDTO> horarioAulaDTOList = horarioAulaService.findAll();
        return new ResponseEntity<>(horarioAulaDTOList, horarioAulaDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }

}
