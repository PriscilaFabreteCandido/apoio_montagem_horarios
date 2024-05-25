package br.com.sistema.Service;

import br.com.sistema.DTO.EquipamentoDTO;
import br.com.sistema.DTO.HistoricoAulaDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.EquipamentoMapper;
import br.com.sistema.Mapper.HistoricoAulaMapper;
import br.com.sistema.Model.Equipamento;
import br.com.sistema.Model.HistoricoAula;
import br.com.sistema.Repository.EquipamentoRepository;
import br.com.sistema.Repository.HistoricoAulaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HistoricoAulaService {

    private final HistoricoAulaRepository repository;
    private final HistoricoAulaMapper mapper;

    public HistoricoAulaDTO create(HistoricoAulaDTO historicoAulaDTO){

        HistoricoAula entity = mapper.toEntity(historicoAulaDTO);

        repository.save(entity);

        return mapper.toDto(entity);
    }

    public HistoricoAulaDTO update(HistoricoAulaDTO historicoAulaDTO, Long id){
        findById(id);

        HistoricoAula entity = mapper.toEntity(historicoAulaDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id){
        repository.delete(mapper.toEntity(findById(id)));
    }

    //=============================================================================================

    public HistoricoAulaDTO findById(Long id){
        HistoricoAula entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Historico da aula com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<HistoricoAulaDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }

}
