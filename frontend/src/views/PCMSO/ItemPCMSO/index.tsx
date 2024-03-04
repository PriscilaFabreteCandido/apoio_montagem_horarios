import {
  CopyOutlined,
  DeleteOutlined,
  InfoOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tooltip } from "antd";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router";

interface DataType {
  key: React.Key;
  GHE: string;
  setor: string;
  cargo: string;
  funcao: string;
  riscos: string;
  status: string;
}

export default function ItemPCMSO() {
  const navigate = useNavigate();

  const [itens, setItens] = useState([
    {
      key: 1,
      GHE: "GHE123",
      setor: "Produção",
      cargo: "Operador de Máquinas",
      funcao: "Operar máquinas de produção",
      riscos: "Exposição a ruídos e vibrações",
      status: "Ativo",
    },
  ]);

  const columns: ColumnsType<DataType> = [
    {
      title: "GHE",
      dataIndex: "GHE",
    },
    {
      title: "Setor",
      dataIndex: "setor",
    },
    {
      title: "Cargo",
      dataIndex: "cargo",
    },
    {
      title: "Função",
      dataIndex: "funcao",
    },
    {
      title: "Riscos",
      dataIndex: "riscos",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Ações",
      key: "acao",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Deseja realmente excluir este item?"
            onConfirm={() => {
              excluirItemPCSMO();
            }}
            okText="Sim"
            cancelText="Não"
          >
            <Tooltip title="Excluir">
              <Button className="senai-btn-danger" shape="circle">
                <DeleteOutlined className="senai-icon" />
              </Button>
            </Tooltip>
          </Popconfirm>

          <Tooltip title="Detalhes">
            <Button
              className="senai-btn-info"
              shape="circle"
              onClick={() => {
                navigate("/PCMSO/Cadastrar/Adicionar itens ao PCMSO/Cadastrar");
              }}
            >
              <InfoOutlined className="senai-icon" />
            </Button>
          </Tooltip>

          <Tooltip title="Clonar este item do PCMSO">
            <Button
              className="senai-btn-warning"
              shape="circle"
              onClick={() => {
                navigate(
                  "/PCMSO/Cadastrar/Adicionar itens ao PCMSO/Clonar Novo Item PCMSO"
                );
              }}
            >
              <CopyOutlined className="senai-icon" />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  function excluirItemPCSMO() {}

  return (
    <>
      <div
        className="flex justify-space-between"
        style={{ marginBottom: "1rem" }}
      >
        <div></div>

        <div>
          <Button
            style={{ marginRight: "0.5rem" }}
            className="senai-btn-success"
            onClick={() => {
              navigate("/PCMSO/Cadastrar/Adicionar itens ao PCMSO/Cadastrar");
            }}
          >
            <PlusOutlined className="senai-icon" />
            Adicionar
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={itens} />
    </>
  );
}
