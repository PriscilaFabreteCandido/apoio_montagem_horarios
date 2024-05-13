package br.com.sistema.Service;


import br.com.sistema.DTO.CoordenadoriaDTO;
import br.com.sistema.DTO.CoordenadorTurnoDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.CoordenadoriaMapper;
import br.com.sistema.Mapper.CoordenadorTurnoMapper;
import br.com.sistema.Model.Coordenadoria;
import br.com.sistema.Model.CoordenadorTurno;
import br.com.sistema.Repository.CoordenadoriaRepository;
import br.com.sistema.Repository.CoordenadorTurnoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CoordenadorTurnoService {

    private final CoordenadorTurnoRepository repository;
    private final CoordenadorTurnoMapper mapper;

    public CoordenadorTurnoDTO create(CoordenadorTurnoDTO coordenadorTurnoDTO){

        CoordenadorTurno entity = mapper.toEntity(coordenadorTurnoDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public CoordenadorTurnoDTO update(CoordenadorTurnoDTO coordenadorTurnoDTO, Long id){
        findById(id);

        CoordenadorTurno entity = mapper.toEntity(coordenadorTurnoDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        CoordenadorTurno coordenadorTurno = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Coordenador de Turno com ID '" + id + "' não encontrado."));

        repository.delete(coordenadorTurno);
    }


    //=============================================================================================

    public CoordenadorTurnoDTO findById(Long id){
        CoordenadorTurno entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Coordenador de Turno com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<CoordenadorTurnoDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }

}
