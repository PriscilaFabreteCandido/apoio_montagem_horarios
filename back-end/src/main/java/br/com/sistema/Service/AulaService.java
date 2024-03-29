package br.com.sistema.Service;

import br.com.sistema.DTO.AulaDTO;
import br.com.sistema.DTO.DisciplinaDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.AulaMapper;
import br.com.sistema.Mapper.DisciplinaMapper;
import br.com.sistema.Model.Aula;
import br.com.sistema.Model.Disciplina;
import br.com.sistema.Repository.AulaRepository;
import br.com.sistema.Repository.DisciplinaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AulaService {

    private final AulaRepository repository;
    private final AulaMapper mapper;

    public AulaDTO create(AulaDTO aulaDTO){

        Aula entity = mapper.toEntity(aulaDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public AulaDTO update(AulaDTO aulaDTO, Long id){
        findById(id);

        Aula entity = mapper.toEntity(aulaDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        Aula aula = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aula com ID '" + id + "' não encontrado."));

        repository.delete(aula);
    }


    //=============================================================================================

    public AulaDTO findById(Long id){
        Aula entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aula com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<AulaDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }

}