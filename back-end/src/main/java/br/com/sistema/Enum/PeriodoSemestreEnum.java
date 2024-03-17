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



}
