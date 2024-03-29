package br.com.sistema.Service;


import br.com.sistema.DTO.CoordenadoriaDTO;
import br.com.sistema.DTO.DisciplinaDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.CoordenadoriaMapper;
import br.com.sistema.Mapper.DisciplinaMapper;
import br.com.sistema.Model.Coordenadoria;
import br.com.sistema.Model.Disciplina;
import br.com.sistema.Repository.CoordenadoriaRepository;
import br.com.sistema.Repository.DisciplinaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DisciplinaService {

    private final DisciplinaRepository repository;
    private final DisciplinaMapper mapper;

    public DisciplinaDTO create(DisciplinaDTO disciplinaDTO){

        Disciplina entity = mapper.toEntity(disciplinaDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public DisciplinaDTO update(DisciplinaDTO disciplinaDTO, Long id){
        findById(id);

        Disciplina entity = mapper.toEntity(disciplinaDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        Disciplina disciplina = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Disciplina com ID '" + id + "' não encontrado."));

        repository.delete(disciplina);
    }


    //=============================================================================================

    public DisciplinaDTO findById(Long id){
        Disciplina entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Disciplina com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<DisciplinaDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }

}
