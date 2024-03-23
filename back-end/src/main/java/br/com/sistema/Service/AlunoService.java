package br.com.sistema.Service;

import br.com.sistema.DTO.AlunoDTO;
import br.com.sistema.DTO.ProfessorDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.AlunoMapper;
import br.com.sistema.Mapper.ProfessorMapper;
import br.com.sistema.Model.Aluno;
import br.com.sistema.Model.Curso;
import br.com.sistema.Model.Professor;
import br.com.sistema.Repository.AlunoRepository;
import br.com.sistema.Repository.CursoRepository;
import br.com.sistema.Repository.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlunoService {

    private final AlunoRepository repository;
    private final AlunoMapper mapper;

    private final CursoRepository cursoRepository;

    public AlunoDTO create(AlunoDTO alunoDTO){

        Aluno entity = mapper.toEntity(alunoDTO);
        repository.save(entity);

        Curso curso = entity.getCurso();

        if(curso != null){
            curso.getAlunos().add(entity);
            cursoRepository.save(curso);
        }

        return mapper.toDto(entity);
    }

    public AlunoDTO update(AlunoDTO alunoDTO, Long id){
        findById(id);

        Aluno entity = mapper.toEntity(alunoDTO);
        entity.setId(id);
        repository.save(entity);

        Curso curso = entity.getCurso();

        if(curso != null){
            curso.getAlunos().add(entity);
            cursoRepository.save(curso);
        }

        return mapper.toDto(entity);

    }

    public void delete(Long id) {
        Aluno aluno = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aluno com ID '" + id + "' não encontrado."));

        repository.delete(aluno);
    }

    //=============================================================================================

    public AlunoDTO findById(Long id){
        Aluno entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aluno com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<AlunoDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }

}
