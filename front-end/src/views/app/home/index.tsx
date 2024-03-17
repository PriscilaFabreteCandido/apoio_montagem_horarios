import { ScheduleOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./styles.css";
import { Button, Space } from "antd";

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

  return (
    <div id="home">
     
    </div>
  );
}
export default Home;
