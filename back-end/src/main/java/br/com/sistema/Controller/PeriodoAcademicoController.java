package br.com.sistema.Controller;

import br.com.sistema.DTO.LocalDTO;
import br.com.sistema.DTO.PeriodoAcademicoDTO;
import br.com.sistema.Service.LocalService;
import br.com.sistema.Service.PeriodoAcademicoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "PeriodoController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/periodos")
public class PeriodoAcademicoController {

    private final PeriodoAcademicoService periodoAcademicoService;

    @PostMapping("/create")
    public ResponseEntity<PeriodoAcademicoDTO> createPeriod(@RequestBody PeriodoAcademicoDTO periodoAcademicoDTO) {
        return new ResponseEntity<>(periodoAcademicoService.create(periodoAcademicoDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PeriodoAcademicoDTO> updatePeriod(@RequestBody PeriodoAcademicoDTO periodoAcademicoDTO, @PathVariable Long id) {
        System.out.println(periodoAcademicoDTO);
        return new ResponseEntity<>(periodoAcademicoService.update(periodoAcademicoDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<PeriodoAcademicoDTO> deletePeriod(@PathVariable Long id) {
        periodoAcademicoService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<PeriodoAcademicoDTO> findPeriodById(@PathVariable Long id) {
        return new ResponseEntity<>(periodoAcademicoService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<PeriodoAcademicoDTO>> findAllPeriods() {
        List<PeriodoAcademicoDTO> periodList = periodoAcademicoService.findAll();
        return new ResponseEntity<>(periodList, periodList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }
}