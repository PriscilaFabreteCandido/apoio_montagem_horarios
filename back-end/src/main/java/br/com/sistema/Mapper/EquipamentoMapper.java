    package br.com.sistema.Mapper;

    import br.com.sistema.DTO.EquipamentoDTO;
    import br.com.sistema.Model.Equipamento;
    import org.mapstruct.Mapper;

    @Mapper(componentModel = "spring")
    public interface EquipamentoMapper extends EntityMapper<EquipamentoDTO, Equipamento> {
    }
