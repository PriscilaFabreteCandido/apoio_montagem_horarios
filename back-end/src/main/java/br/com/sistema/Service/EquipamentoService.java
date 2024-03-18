package br.com.sistema.Service;

import br.com.sistema.DTO.EquipamentoDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.EquipamentoMapper;
import br.com.sistema.Model.Equipamento;
import br.com.sistema.Repository.EquipamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EquipamentoService {

    private final EquipamentoRepository repository;
    private final EquipamentoMapper mapper;

    public EquipamentoDTO create(EquipamentoDTO equipamentoDTO){

        Equipamento entity = mapper.toEntity(equipamentoDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public EquipamentoDTO update(EquipamentoDTO equipamentoDTO, Long id){
        findById(id);

        Equipamento entity = mapper.toEntity(equipamentoDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        // Verifica se o equipamento com o ID fornecido existe no banco de dados
        Equipamento equipamento = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Equipamento com ID '" + id + "' não encontrado."));

        if (!equipamento.getLocalEquipamentos().isEmpty()) {
            throw new RuntimeException("Equipamento está ligado a um local, exclua o local primeiro.");
        }

        repository.delete(equipamento);
    }


    //=============================================================================================

    public EquipamentoDTO findById(Long id){
        Equipamento entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Equipamento com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<EquipamentoDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }


}
