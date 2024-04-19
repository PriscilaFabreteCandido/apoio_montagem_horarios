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

const HorarioTable = () => {
  
  const [periodosLetivos, setPeriodosLetivos] = useState<PeriodoAcademico[]>([]);
  const [periodoSelecionado, setPeriodoSelecionado] = useState<PeriodoAcademico | null>(null);
  const [matricula, setMatricula] = useState<string>("");

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

  const handleMatriculaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatricula(e.target.value);
  };

  const handleVerProximaAulaClick = () => {
    // Implementar a lógica para mostrar a próxima aula com base na matrícula
    // Por enquanto, apenas imprima a matrícula no console
    console.log("Matrícula:", matricula);
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
          onChange={handleMatriculaChange}
        />
        <Button type="primary" onClick={handleVerProximaAulaClick}>
          Ver próxima aula
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
            <th>07:00<br/>07:50</th>
            <th>07:50<br/>08:40</th>
            <th>08:40<br/>09:30</th>
            <th>09:50<br/>10:40</th>
            <th>10:40<br/>11:30</th>
            <th>11:30<br/>12:20</th>
            <th>13:00<br/>13:50</th>
            <th>13:50<br/>14:40</th>
            <th>14:40<br/>15:30</th>
            <th>15:50<br/>16:40</th>
            <th>16:40<br/>17:30</th>
            <th>17:30<br/>18:20</th>
            <th>18:50<br/>19:35</th>
            <th>19:35<br/>20:20</th>
            <th>20:30<br/>21:15</th>
            <th>21:15<br/>22:00</th>
          </tr>
        </thead>
        <tbody>
          {["SEG", "TER", "QUA", "QUI", "SEX"].map((dia, index) => (
            <tr key={index}>
              <td>{dia}</td>
              {Array.from({ length: 16 }).map((_, index) => (
                <td key={index}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HorarioTable;
