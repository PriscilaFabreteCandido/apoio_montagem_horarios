package br.com.sistema.Service;

import br.com.sistema.DTO.LocalDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.LocalMapper;
import br.com.sistema.Model.Local;
import br.com.sistema.Repository.LocalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocalService {

    private final LocalRepository repository;
    private final LocalMapper mapper;

    public LocalDTO create(LocalDTO localDTO){
        Local entity = mapper.toEntity(localDTO);
        repository.save(entity);
        return mapper.toDto(entity);
    }

    public LocalDTO update(LocalDTO localDTO, Long id){
        findById(id);

        Local entity = mapper.toEntity(localDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id){
        repository.delete(mapper.toEntity(findById(id)));
    }

    //=============================================================================================

    public LocalDTO findById(Long id){
        Local entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Local com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<LocalDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }


}
