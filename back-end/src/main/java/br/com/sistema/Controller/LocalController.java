package br.com.sistema.Controller;

import br.com.sistema.DTO.LocalDTO;
import br.com.sistema.Service.LocalService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/local")
public class LocalController {

    private final LocalService localService;

    @PostMapping("/create")
    public ResponseEntity<LocalDTO> createLocal(@RequestBody LocalDTO localDTO){
        return new ResponseEntity<>(localService.create(localDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<LocalDTO> updateLocal(@RequestBody LocalDTO localDTO, @PathVariable Long id){
        return new ResponseEntity<>(localService.update(localDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<LocalDTO> deleteLocal(@PathVariable Long id){
        localService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<LocalDTO> findLocalById(@PathVariable Long id){
        return new ResponseEntity<>(localService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<LocalDTO>> findAllLocais(){
        List<LocalDTO> productList = localService.findAll();
        return new ResponseEntity<>(productList, productList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }
}
