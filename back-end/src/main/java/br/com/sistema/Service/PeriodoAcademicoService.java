package br.com.sistema.Service;

import br.com.sistema.DTO.EventoDTO;
import br.com.sistema.DTO.PeriodoAcademicoDTO;
import br.com.sistema.Enum.FormatoAcademicoEnum;
import br.com.sistema.Enum.PeriodoSemestreEnum;
import br.com.sistema.Exception.BusinessException;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.PeriodoAcademicoMapper;
import br.com.sistema.Model.Evento;
import br.com.sistema.Model.PeriodoAcademico;
import br.com.sistema.Repository.PeriodoAcademicoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PeriodoAcademicoService {

    private final PeriodoAcademicoRepository repository;
    private final PeriodoAcademicoMapper mapper;


    public PeriodoAcademicoDTO create(PeriodoAcademicoDTO periodoAcademicoDTO){
        validate(periodoAcademicoDTO);

        PeriodoAcademico entity = mapper.toEntity(periodoAcademicoDTO);

        repository.save(entity);

        return mapper.toDto(entity);
    }

    public PeriodoAcademicoDTO update(PeriodoAcademicoDTO periodoAcademicoDTO, Long id){
        findById(id);

        validate(periodoAcademicoDTO);

        PeriodoAcademico entity = mapper.toEntity(periodoAcademicoDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id){
        repository.delete(mapper.toEntity(findById(id)));
    }

    //=============================================================================================

    public PeriodoAcademicoDTO findById(Long id){
        PeriodoAcademico entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Período acadêmico com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<PeriodoAcademicoDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }

    private void validate(PeriodoAcademicoDTO periodoAcademicoDTO){
        if(!periodoAcademicoDTO.getFormato().equals("SEMESTRAL") && !periodoAcademicoDTO.getFormato().equals("ANUAL")){
            throw new BusinessException("Formato inválido.");
        }

        if(periodoAcademicoDTO.getFormato().equals("SEMESTRAL") && periodoAcademicoDTO.getPeriodo().equals("-")){
            throw new BusinessException("Período do semestre deve ser 1 ou 2.");
        }

        if(periodoAcademicoDTO.getFormato().equals("ANUAL")){
            periodoAcademicoDTO.setPeriodo("-");
        }

        if(periodoAcademicoDTO.getPeriodo().equals("1")){
            periodoAcademicoDTO.setPeriodo("PRIMEIRO_PERIODO");
        } else if(periodoAcademicoDTO.getPeriodo().equals("2")){
            periodoAcademicoDTO.setPeriodo("SEGUNDO_PERIODO");
        } else if(periodoAcademicoDTO.getPeriodo().equals("-")){
            periodoAcademicoDTO.setPeriodo("NENHUM");
        } else {
            throw new BusinessException("Periodo inválido.");
        }

    }

}
