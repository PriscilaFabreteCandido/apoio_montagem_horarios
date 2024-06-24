package br.com.sistema.Service;

import br.com.sistema.DTO.CoordenadoriaDTO;
import br.com.sistema.DTO.EquipamentoDTO;
import br.com.sistema.Exception.BusinessException;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.CoordenadoriaMapper;
import br.com.sistema.Mapper.EquipamentoMapper;
import br.com.sistema.Model.Coordenadoria;
import br.com.sistema.Model.Equipamento;
import br.com.sistema.Repository.CoordenadoriaRepository;
import br.com.sistema.Repository.EquipamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CoordenadoriaService {

    private final CoordenadoriaRepository repository;
    private final CoordenadoriaMapper mapper;

    public CoordenadoriaDTO create(CoordenadoriaDTO coordenadoriaDTO){

        Coordenadoria entity = mapper.toEntity(coordenadoriaDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public CoordenadoriaDTO update(CoordenadoriaDTO coordenadoriaDTO, Long id){
        findById(id);

        Coordenadoria entity = mapper.toEntity(coordenadoriaDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        Coordenadoria coordenadoria = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Coordenadoria com ID '" + id + "' não encontrado."));

        if (!coordenadoria.getProfessores().isEmpty()) {
            throw new BusinessException("A coordenadoria está ligado a alguns professor, exclua o(s) professor(es) primeiro.");
        }

        repository.delete(coordenadoria);
    }


    //=============================================================================================

    public CoordenadoriaDTO findById(Long id){
        Coordenadoria entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Coordenadoria com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<CoordenadoriaDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }

}
