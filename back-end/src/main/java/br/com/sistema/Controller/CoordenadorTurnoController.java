package br.com.sistema.Controller;

import br.com.sistema.DTO.CoordenadorTurnoDTO;
import br.com.sistema.DTO.EquipamentoDTO;
import br.com.sistema.Service.CoordenadorTurnoService;
import br.com.sistema.Service.EquipamentoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "CoordenadorTurnoController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coordenadoresTurno")
public class CoordenadorTurnoController {

    private final CoordenadorTurnoService coordenadorTurnoService;

    @PostMapping("/create")
    public ResponseEntity<CoordenadorTurnoDTO> createCoordenadorTurno(@RequestBody CoordenadorTurnoDTO coordenadorTurnoDTO) {
        System.out.println(coordenadorTurnoDTO);
        return new ResponseEntity<>(coordenadorTurnoService.create(coordenadorTurnoDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CoordenadorTurnoDTO> updateCoordenadorTurno(@RequestBody CoordenadorTurnoDTO coordenadorTurnoDTO, @PathVariable Long id) {
        System.out.println(coordenadorTurnoDTO);
        return new ResponseEntity<>(coordenadorTurnoService.update(coordenadorTurnoDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CoordenadorTurnoDTO> deleteCoordenadorTurno(@PathVariable Long id) {
        coordenadorTurnoService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<CoordenadorTurnoDTO> findCoordenadorTurnoById(@PathVariable Long id) {
        return new ResponseEntity<>(coordenadorTurnoService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<CoordenadorTurnoDTO>> findAllCoordenadoresTurno() {
        List<CoordenadorTurnoDTO> coordenadorTurnoDTOList = coordenadorTurnoService.findAll();
        return new ResponseEntity<>(coordenadorTurnoDTOList, coordenadorTurnoDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }

}