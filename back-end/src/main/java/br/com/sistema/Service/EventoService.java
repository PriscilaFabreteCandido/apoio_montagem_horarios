package br.com.sistema.Service;

import br.com.sistema.Controller.HistoricoAulaController;
import br.com.sistema.DTO.EquipamentoDTO;
import br.com.sistema.DTO.EventoDTO;
import br.com.sistema.DTO.HistoricoAulaDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.EquipamentoMapper;
import br.com.sistema.Mapper.EventoMapper;
import br.com.sistema.Model.Equipamento;
import br.com.sistema.Model.Evento;
import br.com.sistema.Repository.EquipamentoRepository;
import br.com.sistema.Repository.EventoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventoService {

    private final EventoRepository repository;
    private final EventoMapper mapper;

    private final HistoricoAulaController historicoAulaController;

    public EventoDTO create(EventoDTO eventoDTO){

        Evento entity = mapper.toEntity(eventoDTO);

        repository.save(entity);

        createLog("Evento " + eventoDTO.getDescricao() + " criado.");

        return mapper.toDto(entity);
    }


    public EventoDTO update(EventoDTO eventoDTO, Long id){
        EventoDTO antigo = findById(id);

        Evento entity = mapper.toEntity(eventoDTO);
        entity.setId(id);
        repository.save(entity);

        EventoDTO dto = mapper.toDto(entity);

        String logMessage = String.format(
                "Evento '%s' %s %s-%s alterado para '%s' %s %s-%s",
                antigo.getDescricao(), formatarData(antigo.getData()), formatarHora(antigo.getHoraInicio()), formatarHora(antigo.getHoraFim()),
                dto.getDescricao(), formatarData(dto.getData()), formatarHora(dto.getHoraInicio()), formatarHora(dto.getHoraInicio())
        );

        createLog(logMessage);

        return dto;
    }

    public void delete(Long id){
        EventoDTO eventoDTO = findById(id);
        repository.delete(mapper.toEntity(eventoDTO));

        String logMessage = String.format("Evento '%s' excluído.", eventoDTO.getDescricao());
        createLog(logMessage);
    }

    //=============================================================================================

    public EventoDTO findById(Long id){
        Evento entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Evento com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<EventoDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }

    //=============================================================================================

    private void createLog(String descricao){
        HistoricoAulaDTO historicoAulaDTO = new HistoricoAulaDTO();

        historicoAulaDTO.setUsuario("Fulano");
        historicoAulaDTO.setDataHoraModificacao(new Date());
        historicoAulaDTO.setDescricao(descricao);

        historicoAulaController.createHistoricoAula(historicoAulaDTO);
    }

    private String formatarData(Date data){
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        return sdf.format(data);
    }

    private String formatarHora(Date hora){
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        return sdf.format(hora);
    }

}
