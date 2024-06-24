import { ScheduleOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./styles.css";
import { Button, Space } from "antd";
import { User, clearLoggedInUser, saveLoggedInUser, getLoggedInUser } from '../../../context/AuthService';

export enum Cores {
  AMARELO = "#F3CD03",
  NEUTRO_50 = "#2C343A",
  NEUTRO_80 = "#2C343A",
  ROXO = "#495EBC",
  AZUL = "#4DE5EF",
  AZUL_ESCURO = "#051766",
}

function Home() {
  const [treinamentos, setTreinamentos] = useState<any>([
    { nome: "José luis Alves", data: "01/02/2024" },
    { nome: "Pedro Mendes", data: "01/02/2024" },
    { nome: "Carlos Saldanha", data: "03/02/2024" },
    { nome: "Maria Silva", data: "04/02/2024" },
    { nome: "Carla Fonseca", data: "04/02/2024" },
  ]);

  const [vagasAbertas, setVagasAbertas] = useState<any>([
    { nome: "Mecânico", empresa: "Empresa" },
    { nome: "Soldador", empresa: "Empresa" },
    { nome: "Auxiliar Administrativo", empresa: "Empresa" },
    { nome: "Operador de Maquinas", empresa: "Empresa" },
    { nome: "Engenheiro", empresa: "Empresa" },
    { nome: "RH", empresa: "Empresa" },
  ]);

  const cards = [
    { corFundo: Cores.ROXO, label: "Consultas" },
    { corFundo: '#1A3AC6', label: "Relatórios" },
    { corFundo: Cores.AZUL_ESCURO, label: "PGR" },
    { corFundo: Cores.AZUL_ESCURO, label: "PCMSO" },
  ];

  const isAdmin = !!getLoggedInUser();

  return (
    <div id="home">
      <h1>Bem vindo!</h1>
      <p>Acesso rápido</p>
      <div className="access">
        {isAdmin ? (
          <>
            <div className="card-1">
              <p className="title">Cadastrar Aulas</p>
              <p className="subtitle">Cadastre as aulas do semestre de acordo com horário, número de aulas, turma e sala.</p>
              <a className="button" href="/Cadastros/Aulas">Cadastrar</a>
            </div>
            <div className="card-1">
              <p className="title">Cadastrar Alunos</p>
              <p className="subtitle">Cadastre alunos informando sua matrícula, curso e turma.</p>
              <a className="button" href="/Cadastros/Alunos">Cadastrar</a>
            </div>
            <div className="card-3">
              <p className="title">Consultar horário</p>
              <p className="subtitle">Veja o horário completo, próxima aula e outras funcionalidades.</p>
              <a className="button" href="/Consultas">Consultar</a>
            </div>
            <div className="card-2">
              <p className="title">Alocar Eventos</p>
              <p className="subtitle">Aloque eventos na instituição selecionando o local e horário do evento.</p>
              <a className="button" href="/Alocações/Eventos">Alocar</a>
            </div>
          </>
        ) : (
          <div className="card-3">
            <p className="title">Consultar horário</p>
            <p className="subtitle">Veja o horário completo, próxima aula e outras funcionalidades.</p>
            <a className="button" href="/Consultas">Consultar</a>
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
