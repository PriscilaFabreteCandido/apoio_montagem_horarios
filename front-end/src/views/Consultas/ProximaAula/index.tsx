import React, { useState, useEffect } from "react";
import { Select, Input, Button } from "antd";
import { get } from "../../../api/axios";

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
}

const HorarioTable = () => {
  const [periodosLetivos, setPeriodosLetivos] = useState<PeriodoAcademico[]>([]);
  const [periodoSelecionado, setPeriodoSelecionado] = useState<PeriodoAcademico | null>(null);
  const [matricula, setMatricula] = useState<string>("");
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
    const periodo = periodosLetivos.find(periodo => periodo.id === value);
    if (periodo) {
      setPeriodoSelecionado(periodo);
      console.log("Período acadêmico selecionado:", periodo);
    } else {
      setPeriodoSelecionado(null);
    }
  };

  const handleVerProximaAulaClick = async () => {
    try {
      const response = await get(`aulas/aluno/${matricula}/${periodoSelecionado?.formato}/${periodoSelecionado?.id}`);
      console.log("Próximas aulas:", response);
      setAulas(response);
    } catch (error) {
      console.error("Erro ao obter próxima aula:", error);
    }
  };

  const handleLimparAulasClick = () => {
    setAulas([]);
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
          return diaAula === dia && aula.horarios.some((h) => h.horaInicio.substring(0, 5) === horario.inicio && h.horaFim.substring(0, 5) === horario.fim);
        });

        // Extrair as três primeiras letras da disciplina ou renderizar uma célula vazia
        const disciplinaAbreviada = aulaCorrespondente ? aulaCorrespondente.disciplina.sigla : "";

        // Renderizar as três primeiras letras da disciplina se houver aula neste dia e horário, senão renderizar uma célula vazia
        return <td key={`${dia}-${horario.inicio}`}>{disciplinaAbreviada}</td>;
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
        `}
      </style>

      <div style={{ marginBottom: "16px" }}>
        <Select style={{ width: 200, marginRight: "16px" }} onChange={handlePeriodoChange}>
          {periodosLetivos.map(periodo => (
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
        />
        <Button type="primary" onClick={handleVerProximaAulaClick}>
          Ver aulas
        </Button>
        <Button type="primary" onClick={handleLimparAulasClick} style={{ marginLeft: "16px" }}>
          Limpar
        </Button>
      </div>

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
            <th>07:00 <br /> 07:50</th>
            <th>07:50 <br /> 08:40</th>
            <th>08:40 <br /> 09:30</th>
            <th>09:50 <br /> 10:40</th>
            <th>10:40 <br /> 11:30</th>
            <th>11:30 <br /> 12:20</th>
            <th>13:00 <br /> 13:50</th>
            <th>13:50 <br /> 14:40</th>
            <th>14:40 <br /> 15:30</th>
            <th>15:50 <br /> 16:40</th>
            <th>16:40 <br /> 17:30</th>
            <th>17:30 <br /> 18:20</th>
            <th>18:50 <br /> 19:35</th>
            <th>19:35 <br /> 20:20</th>
            <th>20:30 <br /> 21:15</th>
            <th>21:15 <br /> 22:00</th>
          </tr>
        </thead>
        <tbody>
          {renderizarTabela()}
        </tbody>
      </table>
    </div>
  );
};

export default HorarioTable;
