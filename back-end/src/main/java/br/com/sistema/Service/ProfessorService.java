package br.com.sistema.Service;

import br.com.sistema.DTO.CursoDTO;
import br.com.sistema.DTO.ProfessorDTO;
import br.com.sistema.Exception.BusinessException;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.CursoMapper;
import br.com.sistema.Mapper.ProfessorMapper;
import br.com.sistema.Model.Curso;
import br.com.sistema.Model.Professor;
import br.com.sistema.Repository.AlunoRepository;
import br.com.sistema.Repository.AulaRepository;
import br.com.sistema.Repository.CursoRepository;
import br.com.sistema.Repository.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfessorService {

    private final ProfessorRepository repository;
    private final ProfessorMapper mapper;

    private final AulaRepository aulaRepository;
    private final AlunoRepository alunoRepository;

    public ProfessorDTO create(ProfessorDTO professorDTO){

        if (repository.existsByMatricula(professorDTO.getMatricula())) {
            throw new BusinessException("Já existe um professor com a matrícula '" + professorDTO.getMatricula() + "'.");
        }

        if (alunoRepository.existsByMatricula(professorDTO.getMatricula())) {
            throw new EntityNotFoundException("Já existe um aluno com a matrícula '" + professorDTO.getMatricula() + "'.");
        }

        Professor entity = mapper.toEntity(professorDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public ProfessorDTO update(ProfessorDTO professorDTO, Long id){

        ProfessorDTO old = findById(id);


        if(!professorDTO.getMatricula().equals(old.getMatricula())){
            if (repository.existsByMatricula(professorDTO.getMatricula())) {
                throw new BusinessException("Já existe um professor com a matrícula '" + professorDTO.getMatricula() + "'.");
            }

            if (alunoRepository.existsByMatricula(professorDTO.getMatricula())) {
                throw new EntityNotFoundException("Já existe um aluno com a matrícula '" + professorDTO.getMatricula() + "'.");
            }
        }


        Professor entity = mapper.toEntity(professorDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        Professor professor = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Professor com ID '" + id + "' não encontrado."));

        if(aulaRepository.existsAulasByProfessorId(professor.getId())){
            throw new BusinessException("Este professor possui aulas cadastradas e não pode ser excluido.");
        }

        repository.delete(professor);
    }


    //=============================================================================================

    public ProfessorDTO findById(Long id){
        Professor entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Professor com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<ProfessorDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }

    public ProfessorDTO findProfessorByMatricula(String matricula){
        if (!repository.existsByMatricula(matricula)) {
            throw new BusinessException("Professor com matricula '" + matricula + "' não encontrado.");
        }

        Professor entity = repository.findByMatricula(matricula);

        return mapper.toDto(entity);
    }


    private void validate(ProfessorDTO professorDTO){
        if(!professorDTO.getCoordenador()){
            professorDTO.setCoordenador(false);
        }

    }

}
