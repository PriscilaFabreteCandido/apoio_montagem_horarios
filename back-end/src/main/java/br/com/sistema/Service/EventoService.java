package br.com.sistema.Service;

import br.com.sistema.DTO.EquipamentoDTO;
import br.com.sistema.DTO.EventoDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.EquipamentoMapper;
import br.com.sistema.Mapper.EventoMapper;
import br.com.sistema.Model.Equipamento;
import br.com.sistema.Model.Evento;
import br.com.sistema.Repository.EquipamentoRepository;
import br.com.sistema.Repository.EventoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventoService {

    private final EventoRepository repository;
    private final EventoMapper mapper;

    public EventoDTO create(EventoDTO eventoDTO){

        Evento entity = mapper.toEntity(eventoDTO);

        repository.save(entity);

        return mapper.toDto(entity);
    }

    public EventoDTO update(EventoDTO eventoDTO, Long id){
        findById(id);

        Evento entity = mapper.toEntity(eventoDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id){
        repository.delete(mapper.toEntity(findById(id)));
    }

    //=============================================================================================

    public EventoDTO findById(Long id){
        Evento entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Evento com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<EventoDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }

}
