package br.com.sistema.Controller;

import br.com.sistema.DTO.CoordenadoriaDTO;
import br.com.sistema.DTO.EquipamentoDTO;
import br.com.sistema.Service.CoordenadoriaService;
import br.com.sistema.Service.EquipamentoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "CoordenadoriaController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coordenadorias")
public class CoordenadoriaController {

    private final CoordenadoriaService coordenadoriaService;

    @PostMapping("/create")
    public ResponseEntity<CoordenadoriaDTO> createCoordenadoria(@RequestBody CoordenadoriaDTO coordenadoriaDTO) {
        System.out.println(coordenadoriaDTO);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userLogin = authentication.getName();
        return new ResponseEntity<>(coordenadoriaService.create(coordenadoriaDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CoordenadoriaDTO> updateCoordenadoria(@RequestBody CoordenadoriaDTO coordenadoriaDTO, @PathVariable Long id) {
        System.out.println(coordenadoriaDTO);
        return new ResponseEntity<>(coordenadoriaService.update(coordenadoriaDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CoordenadoriaDTO> deleteCoordenadoria(@PathVariable Long id) {
        coordenadoriaService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<CoordenadoriaDTO> findCoordenadoriaById(@PathVariable Long id) {
        return new ResponseEntity<>(coordenadoriaService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<CoordenadoriaDTO>> findAllCoordenadorias() {
        List<CoordenadoriaDTO> coordenadoriaDTOList = coordenadoriaService.findAll();
        return new ResponseEntity<>(coordenadoriaDTOList, coordenadoriaDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }

}