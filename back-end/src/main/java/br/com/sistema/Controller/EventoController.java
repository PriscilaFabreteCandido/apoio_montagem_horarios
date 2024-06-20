package br.com.sistema.Controller;

import br.com.sistema.DTO.EquipamentoDTO;
import br.com.sistema.DTO.EventoDTO;
import br.com.sistema.Service.EquipamentoService;
import br.com.sistema.Service.EventoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "EventoController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/eventos")
public class EventoController {

    private final EventoService eventoService;

    @PostMapping("/create")
    public ResponseEntity<EventoDTO> createEvent(@RequestBody EventoDTO eventoDTO){
        System.out.println(eventoDTO);
        return new ResponseEntity<>(eventoService.create(eventoDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<EventoDTO> updateEvent(@RequestBody EventoDTO eventoDTO, @PathVariable Long id){
        System.out.println(eventoDTO);
        return new ResponseEntity<>(eventoService.update(eventoDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<EventoDTO> deleteEvent(@PathVariable Long id){
        eventoService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<EventoDTO> findEventById(@PathVariable Long id){
        return new ResponseEntity<>(eventoService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<EventoDTO>> findAllEvents(){
        List<EventoDTO> eventList = eventoService.findAll();
        return new ResponseEntity<>(eventList, eventList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }
}
