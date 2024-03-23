package br.com.sistema.Controller;

import br.com.sistema.DTO.EquipamentoDTO;
import br.com.sistema.Service.EquipamentoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "EquipamentoController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/equipamentos")
public class EquipamentoController {

    private final EquipamentoService equipamentoService;

    @PostMapping("/create")
    public ResponseEntity<EquipamentoDTO> createEquipment(@RequestBody EquipamentoDTO equipamentoDTO){
        return new ResponseEntity<>(equipamentoService.create(equipamentoDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<EquipamentoDTO> updateEquipment(@RequestBody EquipamentoDTO equipamentoDTO, @PathVariable Long id){
        System.out.println(equipamentoDTO);
        return new ResponseEntity<>(equipamentoService.update(equipamentoDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<EquipamentoDTO> deleteEquipment(@PathVariable Long id){
        equipamentoService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<EquipamentoDTO> findEquipmentById(@PathVariable Long id){
        return new ResponseEntity<>(equipamentoService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<EquipamentoDTO>> findAllEquipments(){
        List<EquipamentoDTO> equipamentList = equipamentoService.findAll();
        return new ResponseEntity<>(equipamentList, equipamentList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }
}
