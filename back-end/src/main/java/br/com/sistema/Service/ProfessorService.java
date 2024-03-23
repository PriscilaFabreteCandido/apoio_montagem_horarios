package br.com.sistema.Service;

import br.com.sistema.DTO.CursoDTO;
import br.com.sistema.DTO.ProfessorDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.CursoMapper;
import br.com.sistema.Mapper.ProfessorMapper;
import br.com.sistema.Model.Curso;
import br.com.sistema.Model.Professor;
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

    public ProfessorDTO create(ProfessorDTO professorDTO){

        Professor entity = mapper.toEntity(professorDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public ProfessorDTO update(ProfessorDTO professorDTO, Long id){
        findById(id);

        Professor entity = mapper.toEntity(professorDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        Professor professor = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Professor com ID '" + id + "' não encontrado."));

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

    private void validate(ProfessorDTO professorDTO){
        if(!professorDTO.getCoordenador()){
            professorDTO.setCoordenador(false);
        }

    }

}
