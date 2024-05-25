import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { get } from "../../../api/axios";

interface HistoricoAula {
  key: React.Key;
  id: number;
  usuario: string;
  descricao: string;
  dataHoraModificacao: string;
}

const Logs: React.FC = () => {
  const [historicoAula, setHistoricoAula] = useState<HistoricoAula[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getHistoricoAula = async () => {
    setLoading(true);
    try {
      const response: HistoricoAula[] = await get("historico-aulas");
      // Sort the response in descending order based on dataHoraModificacao
      response.sort((a, b) => {
        return new Date(b.dataHoraModificacao).getTime() - new Date(a.dataHoraModificacao).getTime();
      });
      setHistoricoAula(response);
    } catch (error) {
      console.error("Erro ao obter histórico de aula:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistoricoAula();
  }, []);

  const columns: ColumnsType<HistoricoAula> = [
    {
      title: "Usuário",
      dataIndex: "usuario",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
    },
    {
      title: "Hora da alteração",
      dataIndex: "dataHoraModificacao",
      render: (dataHoraModificacao: string) => {
        // Format the date and time as dd-MM-yyyy HH:mm
        const dateTime = new Date(dataHoraModificacao);
        const formattedDateTime = `${dateTime.getDate().toString().padStart(2, '0')}-${(dateTime.getMonth() + 1).toString().padStart(2, '0')}-${dateTime.getFullYear()} ${dateTime.getHours().toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}:${dateTime.getSeconds().toString().padStart(2, '0')}`;
        return formattedDateTime;
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={historicoAula} loading={loading} />
    </>
  );
};

export default Logs;
