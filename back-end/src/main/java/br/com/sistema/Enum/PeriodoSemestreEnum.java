package br.com.sistema.Enum;

public enum PeriodoSemestreEnum {
    PRIMEIRO_PERIODO("1"),
    SEGUNDO_PERIODO("2"),
    NENHUM("-");

    private final String descricao;

    PeriodoSemestreEnum(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    public static PeriodoSemestreEnum fromDescricao(String descricao) {
        for (PeriodoSemestreEnum periodo : values()) {
            if (periodo.descricao.equals(descricao)) {
                return periodo;
            }
        }
        return null; // ou lança uma exceção, dependendo do que você preferir
    }


}
