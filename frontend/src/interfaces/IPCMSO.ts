interface DossieEletronicoForm {
  descricao: string;
  tituloDossie: string;
  dataEmissaoDossie: string; // Assumindo que as datas são representadas como strings
  dataValidadeDossie: string;
  observacoesDossie?: string;
}

interface PCMSOForm {
  contrato: string;
  dataInicioContrato: string;
  disposicoesGerais: string;
}

interface PGRForm {
  totalFuncionarios: number;
  dataEmissao: string;
  dataValidade: string;
}

interface MedicoResponsavelForm {
  nomeMedico: string;
  especialidadeMedico: string;
  crmMedico: string;
  ufMedico: string;
  telefoneMedico?: string;
  enderecoMedico?: string;
}

interface CadastroPCMSOForm
  extends DossieEletronicoForm,
    PCMSOForm,
    PGRForm,
    MedicoResponsavelForm {
  // Adicione campos adicionais conforme necessário
}

export default CadastroPCMSOForm;
