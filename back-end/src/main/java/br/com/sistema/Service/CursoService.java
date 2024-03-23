package br.com.sistema.Service;

import br.com.sistema.DTO.CoordenadoriaDTO;
import br.com.sistema.DTO.CursoDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.CoordenadoriaMapper;
import br.com.sistema.Mapper.CursoMapper;
import br.com.sistema.Model.Coordenadoria;
import br.com.sistema.Model.Curso;
import br.com.sistema.Repository.CoordenadoriaRepository;
import br.com.sistema.Repository.CursoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CursoService {

    private final CursoRepository repository;
    private final CursoMapper mapper;

    private final CoordenadoriaRepository coordenadoriaRepository;

    public CursoDTO create(CursoDTO cursoDTO){

        Curso entity = mapper.toEntity(cursoDTO);
        repository.save(entity);

        Coordenadoria coordenadoria = entity.getCoordenadoria();

        if(coordenadoria != null){
            coordenadoria.setCurso(entity);
            coordenadoriaRepository.save(coordenadoria);
        }

        return mapper.toDto(entity);
    }

    public CursoDTO update(CursoDTO cursoDTO, Long id){
        findById(id);

        Curso entity = mapper.toEntity(cursoDTO);
        entity.setId(id);
        repository.save(entity);

        Coordenadoria coordenadoria = entity.getCoordenadoria();

        if(coordenadoria != null){
            coordenadoria.setCurso(entity);
            coordenadoriaRepository.save(coordenadoria);
        }

        coordenadoria.setCurso(entity);
        coordenadoriaRepository.save(coordenadoria);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        Curso curso = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Curso com ID '" + id + "' não encontrado."));

        if (!curso.getAlunos().isEmpty()) {
            throw new RuntimeException("O curso tem vários alunos ligados a ele, não é possivel excluir.");
        }

        repository.delete(curso);
    }


    //=============================================================================================

    public CursoDTO findById(Long id){
        Curso entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Curso com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<CursoDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }

}
