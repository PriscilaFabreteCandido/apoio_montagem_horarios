package br.com.sistema.Service;

import br.com.sistema.DTO.DisciplinaDTO;
import br.com.sistema.DTO.TurmaDTO;
import br.com.sistema.Exception.BusinessException;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.DisciplinaMapper;
import br.com.sistema.Mapper.TurmaMapper;
import br.com.sistema.Model.Disciplina;
import br.com.sistema.Model.Turma;
import br.com.sistema.Repository.DisciplinaRepository;
import br.com.sistema.Repository.TurmaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TurmaService {

    private final TurmaRepository repository;
    private final TurmaMapper mapper;

    public TurmaDTO create(TurmaDTO turmaDTO){

        Turma entity = mapper.toEntity(turmaDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public TurmaDTO update(TurmaDTO turmaDTO, Long id){
        findById(id);

        Turma entity = mapper.toEntity(turmaDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        Turma turma = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Turma com ID '" + id + "' não encontrado."));

        if(turma.getAlunos() != null){
            throw new BusinessException("Esta turma possui alunos cadastrados e não pode ser excluida.");
        }

        repository.delete(turma);
    }


    //=============================================================================================

    public TurmaDTO findById(Long id){
        Turma entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Turma com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<TurmaDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }


}
