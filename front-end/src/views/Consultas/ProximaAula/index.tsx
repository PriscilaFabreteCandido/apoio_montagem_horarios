import React, { useState, useEffect } from "react";
import { Select, Input, Button } from "antd";
import { get } from "../../../api/axios";
import { message } from "antd/lib";

const { Option } = Select;

interface PeriodoAcademico {
  id: number;
  ano: number;
  periodo: string;
  formato: string;
}

interface Aula {
  id: number;
  diaSemana: string;
  horarios: { id: number; horaInicio: string; horaFim: string }[];
  disciplina: { id: number; nome: string; sigla: string };
  professor: { id: number; nome: string };
  local: { id: number; descricao: string };
}

interface Aluno {
  id: number;
  nome: string;
  matricula: string;
  turma: { id: number; nome: string };
  curso: {
    id: number;
    nome: string;
    coordenadoria: { id: number; descricao: string };
  };
  aulas: Aula[] | null;
}

interface Professor {
  id: number;
  nome: string;
  matricula: string;
}

const HorarioTable = () => {
  const [periodosLetivos, setPeriodosLetivos] = useState<PeriodoAcademico[]>(
    []
  );
  const [periodoSelecionado, setPeriodoSelecionado] =
    useState<PeriodoAcademico | null>(null);
  const [matricula, setMatricula] = useState<string>("");
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [aulas, setAulas] = useState<Aula[]>([]);

  const setPeriodosAcademicos = async () => {
    try {
      const response = await get("periodos");
      setPeriodosLetivos(response);
    } catch (error) {
      console.error("Erro ao obter períodos acadêmicos:", error);
    }
  };

  useEffect(() => {
    setPeriodosAcademicos();
  }, []);

  const handlePeriodoChange = (value: number) => {
    const periodo = periodosLetivos.find((periodo) => periodo.id === value);
    if (periodo) {
      setPeriodoSelecionado(periodo);
      console.log("Período acadêmico selecionado:", periodo);
    } else {
      setPeriodoSelecionado(null);
    }
  };

  const carregarTabela = async () => {
    try {
      const response = await get(
        `aulas/aluno/${matricula}/${periodoSelecionado?.formato}/${periodoSelecionado?.periodo}/${periodoSelecionado?.ano}`
      );
      console.log("Próximas aulas:", response);
      setAulas(response);
    } catch (error: any) {
      showError(
        "Erro ao processar o formulário: " + error.response.data.message
      );
      console.error("Erro ao obter próxima aula:", error);
    }
  };

  const handleVerProximaAulaClick = async () => {
    // Verificar se o período acadêmico foi selecionado
    if (!periodoSelecionado) {
      showError("Por favor, selecione um período acadêmico.");
      return;
    }

    // Verificar se o campo de matrícula está vazio
    if (matricula.trim() === "") {
      showError("Por favor, insira a matrícula do aluno.");
      return;
    }

    try {
      handleLimparAulasClick();
      const professorResponse = await get(`professores/matricula/${matricula}`);
      console.log("Dados do professor:", professorResponse);
      setProfessor(professorResponse);
      renderizarTabelaProfessor(); // Chamada para renderizar a tabela do professor
      carregarTabela();
      return;
    } catch (error) {
      handleLimparAulasClick();
    }

    try {
      handleLimparAulasClick();
      const alunoResponse = await get(`alunos/matricula/${matricula}`);
      console.log("Dados do aluno:", alunoResponse);
      setAluno(alunoResponse);
      renderizarTabelaAluno(); // Chamada para renderizar a tabela do aluno
      carregarTabela();
      return;
    } catch (error) {
      handleLimparAulasClick();
    }

    showError("Matrícula não encontrada.");
  };

  const showError = (errorMessage: string) => {
    message.error(errorMessage);
  };

  const handleLimparAulasClick = () => {
    setAulas([]);
    setAluno(null);
    setProfessor(null);
  };

  const renderPeriodoAcademico = (periodoAcademico: PeriodoAcademico) => {
    if (periodoAcademico) {
      if (periodoAcademico.formato === "ANUAL") {
        return `${periodoAcademico.ano}`;
      } else {
        return `${periodoAcademico.ano}/${periodoAcademico.periodo}`;
      }
    }
    return "";
  };

  const renderProfessorAbreviado = (nome: string) => {
    const partesNome = nome.split(" ");
    if (partesNome.length >= 2) {
      // Pegar a primeira letra do primeiro nome
      const primeiroNome = partesNome[0];
      // Pegar as iniciais do restante do nome
      const iniciaisRestanteNome = partesNome
        .slice(1)
        .map((parte) => parte.charAt(0))
        .join("");
      return primeiroNome + " " + iniciaisRestanteNome;
    }
    return nome; // Retorna o nome original se não for possível abreviar
  };

  const renderDescricaoLocalAbreviada = (descricao: string) => {
    const palavras = descricao.split(" ");
    if (palavras.length >= 2) {
      // Pegar as primeiras 4 letras da primeira palavra
      const primeiraPalavraAbreviada = palavras[0].substring(0, 4);
      // Pegar a segunda palavra
      const segundaPalavra = palavras[1];
      return primeiraPalavraAbreviada + " " + segundaPalavra;
    }
    return descricao; // Retorna a descrição original se não for possível abreviar
  };

  const renderizarTabela = () => {
    // Array para armazenar as células da tabela
    const tabela: JSX.Element[] = [];

    // Dias da semana e horários da tabela
    const diasSemana = ["SEG", "TER", "QUA", "QUI", "SEX"];
    const horarios = [
      { inicio: "07:00", fim: "07:50" },
      { inicio: "07:50", fim: "08:40" },
      { inicio: "08:40", fim: "09:30" },
      { inicio: "09:50", fim: "10:40" },
      { inicio: "10:40", fim: "11:30" },
      { inicio: "11:30", fim: "12:20" },
      { inicio: "13:00", fim: "13:50" },
      { inicio: "13:50", fim: "14:40" },
      { inicio: "14:40", fim: "15:30" },
      { inicio: "15:50", fim: "16:40" },
      { inicio: "16:40", fim: "17:30" },
      { inicio: "17:30", fim: "18:20" },
      { inicio: "18:50", fim: "19:35" },
      { inicio: "19:35", fim: "20:20" },
      { inicio: "20:30", fim: "21:15" },
      { inicio: "21:15", fim: "22:00" },
    ];

    // Iterar sobre os dias da semana e horários
    diasSemana.forEach((dia) => {
      const celulas = horarios.map((horario) => {
        // Encontrar a aula correspondente ao dia e horário atual
        const aulaCorrespondente = aulas.find((aula) => {
          const diaAula = aula.diaSemana.substring(0, 3); // Pegar as 3 primeiras letras do dia da aula
          return (
            diaAula === dia &&
            aula.horarios.some(
              (h) =>
                h.horaInicio.substring(0, 5) === horario.inicio &&
                h.horaFim.substring(0, 5) === horario.fim
            )
          );
        });

        // Extrair as três primeiras letras da disciplina ou renderizar uma célula vazia
        const disciplinaAbreviada = aulaCorrespondente
          ? aulaCorrespondente.disciplina.sigla
          : "";
        // Abreviar o nome do professor
        const nomeProfessorAbreviado = aulaCorrespondente
          ? renderProfessorAbreviado(aulaCorrespondente.professor.nome)
          : "";
        // Abreviar a descrição do local
        const descricaoLocalAbreviada = aulaCorrespondente
          ? renderDescricaoLocalAbreviada(aulaCorrespondente.local.descricao)
          : "";

        // Renderizar as informações na célula
        return (
          <td key={`${dia}-${horario.inicio}`} className="info-cell">
            {nomeProfessorAbreviado}
            <br />
            {disciplinaAbreviada}
            <br />
            {descricaoLocalAbreviada}
          </td>
        );
      });
      // Adicionar a linha da tabela ao array
      tabela.push(
        <tr key={dia}>
          <td>{dia}</td>
          {celulas}
        </tr>
      );
    });

    return tabela;
  };

  const renderizarTabelaProfessor = () => {
    if (professor) {
      return (
        <table className="table-container info-table">
          <tbody>
            <tr>
              <th>Professor</th>
              <td>{professor.nome}</td>
            </tr>
            <tr>
              <th>Matrícula</th>
              <td>{professor.matricula}</td>
            </tr>
          </tbody>
        </table>
      );
    }
    return null;
  };

  const renderizarTabelaAluno = () => {
    if (aluno) {
      return (
        <table className="table-container info-table">
          <tbody>
            <tr>
              <th>Aluno</th>
              <td>{aluno.nome}</td>
            </tr>
            <tr>
              <th>Matrícula</th>
              <td>{aluno.matricula}</td>
            </tr>
            <tr>
              <th>Curso</th>
              <td>{aluno.curso.nome}</td>
            </tr>
            <tr>
              <th>Turma</th>
              <td>{aluno.turma.nome}</td>
            </tr>
          </tbody>
        </table>
      );
    }
    return null;
  };

  return (
    <div>
      <style>
        {`
          .table-container {
            border: 2px solid black;
            border-collapse: collapse;
            width: 100%;
          }
          
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: center;
          }
          
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }

          .info-table {
            width: auto;
            margin-top: 10px;
            margin-bottom: 50px;
          }

          .info-cell {
            font-size: 12px; // Defina o tamanho da fonte desejado  
          }
        

        `}
      </style>
      <div style={{ marginBottom: "16px" }}>
        <Select
          style={{ width: 200, marginRight: "16px" }}
          onChange={handlePeriodoChange}
        >
          {Array.isArray(periodosLetivos) &&
            periodosLetivos.map((periodo) => (
              <Option key={periodo.id} value={periodo.id}>
                {renderPeriodoAcademico(periodo)}
              </Option>
            ))}
        </Select>
        <Input
          placeholder="Matrícula"
          style={{ width: 200, marginRight: "16px" }}
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          onPressEnter={handleVerProximaAulaClick}
        />
        <Button type="primary" onClick={handleVerProximaAulaClick}>
          Ver aulas
        </Button>
        <Button
          type="primary"
          onClick={handleLimparAulasClick}
          style={{ marginLeft: "16px" }}
        >
          Limpar
        </Button>
      </div>
      {aluno && renderizarTabelaAluno()}{" "}
      {/* Renderiza a tabela do aluno se houver dados de aluno */}
      {professor && renderizarTabelaProfessor()}
      <table className="table-container">
        <thead>
          <tr>
            <th></th>
            <th colSpan={6}>MATUTINO</th>
            <th colSpan={6}>VESPERTINO</th>
            <th colSpan={4}>NOTURNO</th>
          </tr>
          <tr>
            <th></th>
            <th>
              07:00 <br /> 07:50
            </th>
            <th>
              07:50 <br /> 08:40
            </th>
            <th>
              08:40 <br /> 09:30
            </th>
            <th>
              09:50 <br /> 10:40
            </th>
            <th>
              10:40 <br /> 11:30
            </th>
            <th>
              11:30 <br /> 12:20
            </th>
            <th>
              13:00 <br /> 13:50
            </th>
            <th>
              13:50 <br /> 14:40
            </th>
            <th>
              14:40 <br /> 15:30
            </th>
            <th>
              15:50 <br /> 16:40
            </th>
            <th>
              16:40 <br /> 17:30
            </th>
            <th>
              17:30 <br /> 18:20
            </th>
            <th>
              18:50 <br /> 19:35
            </th>
            <th>
              19:35 <br /> 20:20
            </th>
            <th>
              20:30 <br /> 21:15
            </th>
            <th>
              21:15 <br /> 22:00
            </th>
          </tr>
        </thead>
        <tbody>{renderizarTabela()}</tbody>
      </table>
    </div>
  );
};

export default HorarioTable;