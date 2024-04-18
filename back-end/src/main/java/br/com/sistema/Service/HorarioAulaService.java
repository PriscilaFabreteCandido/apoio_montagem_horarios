package br.com.sistema.Service;

import br.com.sistema.DTO.EquipamentoDTO;
import br.com.sistema.DTO.EventoDTO;
import br.com.sistema.DTO.HorarioAulaDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.EquipamentoMapper;
import br.com.sistema.Mapper.EventoMapper;
import br.com.sistema.Mapper.HorarioAulaMapper;
import br.com.sistema.Model.Equipamento;
import br.com.sistema.Model.Evento;
import br.com.sistema.Model.HorarioAula;
import br.com.sistema.Repository.EquipamentoRepository;
import br.com.sistema.Repository.EventoRepository;
import br.com.sistema.Repository.HorarioAulaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HorarioAulaService {

    private final HorarioAulaRepository repository;
    private final HorarioAulaMapper mapper;

    public HorarioAulaDTO create(HorarioAulaDTO horarioAulaDTO){

        HorarioAula entity = mapper.toEntity(horarioAulaDTO);

        repository.save(entity);

        return mapper.toDto(entity);
    }

    public HorarioAulaDTO update(HorarioAulaDTO horarioAulaDTO, Long id){
        findById(id);

        HorarioAula entity = mapper.toEntity(horarioAulaDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id){
        repository.delete(mapper.toEntity(findById(id)));
    }

    //=============================================================================================

    public HorarioAulaDTO findById(Long id){
        HorarioAula entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Horario com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<HorarioAulaDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }

}
