package br.com.sistema.Service;

import br.com.sistema.DTO.LocalDTO;
import br.com.sistema.DTO.LocalEquipamentoDTO;
import br.com.sistema.Exception.BusinessException;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.LocalMapper;
import br.com.sistema.Model.Equipamento;
import br.com.sistema.Model.Local;
import br.com.sistema.Model.LocalEquipamento;
import br.com.sistema.Repository.AulaRepository;
import br.com.sistema.Repository.EquipamentoRepository;
import br.com.sistema.Repository.LocalEquipamentoRepository;
import br.com.sistema.Repository.LocalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocalService {

    private final LocalRepository repository;
    private final LocalMapper mapper;

    private final EquipamentoRepository equipamentoRepository;
    private final LocalEquipamentoRepository localEquipamentoRepository;

    private final AulaRepository aulaRepository;

    public LocalDTO create(LocalDTO localDTO) {
        Local entity = mapper.toEntity(localDTO);

        if (localDTO.getEquipamentos() != null) {
            List<LocalEquipamento> localEquipamentos = new ArrayList<>();

            // Lista para armazenar IDs de equipamentos já adicionados
            List<Long> equipamentoIds = new ArrayList<>();

            for (LocalEquipamentoDTO localEquipamentoDTO : localDTO.getEquipamentos()) {
                Long idEquipamento = localEquipamentoDTO.getEquipamento().getId();

                // Verifica se o equipamento já foi adicionado anteriormente
                if (equipamentoIds.contains(idEquipamento)) {
                    throw new BusinessException("Equipamento duplicado encontrado: " + idEquipamento);
                }

                // Adiciona o ID do equipamento à lista de IDs
                equipamentoIds.add(idEquipamento);

                LocalEquipamento localEquipamento = new LocalEquipamento();
                localEquipamento.setLocal(entity);

                Equipamento equipamento = equipamentoRepository.findById(idEquipamento)
                        .orElseThrow(() -> new RuntimeException("Equipamento não encontrado com ID: " + idEquipamento));

                localEquipamento.setEquipamento(equipamento);
                localEquipamento.setQuantidade(localEquipamentoDTO.getQuantidade());

                localEquipamentos.add(localEquipamento);
            }

            entity.setLocalEquipamentos(localEquipamentos);
        }

        repository.save(entity);

        return mapper.toDto(entity);
    }




    public LocalDTO update(LocalDTO localDTO, Long id) {
        // Verifica se o local com o ID fornecido existe no banco de dados
        Local existingLocal = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Local com ID '" + id + "' não encontrado."));

        // Atualiza os detalhes do local com os dados do DTO
        existingLocal.setDescricao(localDTO.getDescricao());
        existingLocal.setCapacidade(localDTO.getCapacidade());

        // Mapeia os equipamentos do DTO para um mapa usando o ID do equipamento como chave
        Map<Long, LocalEquipamentoDTO> equipamentoDTOMap = localDTO.getEquipamentos().stream()
                .collect(Collectors.toMap(
                        localEquipamentoDTO -> localEquipamentoDTO.getEquipamento().getId(),
                        Function.identity()
                ));

        // Cria um iterador para percorrer a lista de LocalEquipamento
        Iterator<LocalEquipamento> iterator = existingLocal.getLocalEquipamentos().iterator();
        while (iterator.hasNext()) {
            LocalEquipamento localEquipamento = iterator.next();
            Long equipamentoId = localEquipamento.getEquipamento().getId();
            if (equipamentoDTOMap.containsKey(equipamentoId)) {
                // Se o equipamento existir no DTO, atualiza a quantidade
                LocalEquipamentoDTO updatedEquipamentoDTO = equipamentoDTOMap.get(equipamentoId);
                localEquipamento.setQuantidade(updatedEquipamentoDTO.getQuantidade());
                // Remove o equipamento do mapa para marcar como atualizado
                equipamentoDTOMap.remove(equipamentoId);
            } else {
                // Se o equipamento não existir no DTO, remove o LocalEquipamento
                iterator.remove(); // Usando o iterador para remover o item da lista
            }
        }

        // Adiciona os novos LocalEquipamento do DTO
        for (LocalEquipamentoDTO newEquipamentoDTO : equipamentoDTOMap.values()) {
            LocalEquipamento newLocalEquipamento = new LocalEquipamento();
            newLocalEquipamento.setLocal(existingLocal);

            Long idEquipamento = newEquipamentoDTO.getEquipamento().getId();
            Equipamento equipamento = equipamentoRepository.findById(idEquipamento)
                    .orElseThrow(() -> new RuntimeException("Equipamento não encontrado com ID: " + idEquipamento));

            newLocalEquipamento.setEquipamento(equipamento);
            newLocalEquipamento.setQuantidade(newEquipamentoDTO.getQuantidade());

            existingLocal.getLocalEquipamentos().add(newLocalEquipamento);
        }

        // Salva as atualizações no banco de dados
        repository.save(existingLocal);

        // Retorna o DTO atualizado
        return mapper.toDto(existingLocal);
    }


    public void delete(Long id) {
        Local local = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Local com ID '" + id + "' não encontrado."));


        if(aulaRepository.existsAulasByLocalId(id)){
            throw new BusinessException("Não é possivel excluir o local pois ele pertence a alguma aula.");
        }


        localEquipamentoRepository.deleteByLocal(local);

        repository.delete(local);
    }


    //=============================================================================================

    public LocalDTO findById(Long id){
        Local entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Local com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<LocalDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }


}
