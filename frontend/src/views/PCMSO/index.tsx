import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Popconfirm,
  Space,
  Table,
  Tooltip,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  DeleteOutlined,
  InfoOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { axiosPrivate } from "../../api/axios";

interface DataType {
  key: string;
  contratante: string;
  nContrato: string;
  razaoSocial: string;
  emissao: string;
  vencimento: string;
  status: string;
}


function PCMSO() {
  const navigate = useNavigate();

  const [pcmsos, setPCMSOs] = useState<any>([
    {
      key: "1",
      contratante: "John Brown",
      nContrato: "123",
      razaoSocial: "ABC Ltda",
      emissao: "01/01/2024",
      vencimento: "02/01/2024",
      status: "Ativo",
    },
  ]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Contratante",
      dataIndex: "contratante",
      key: "contratante",
      onCell: () => {
        return {
          onClick: () => {
            navigate("/PCMSO/Cadastrar");
          },
        };
      },
    },
    {
      title: "N Contrato",
      dataIndex: "nContrato",
      key: "nContrato",
      onCell: () => {
        return {
          onClick: () => {
            navigate("/PCMSO/Cadastrar");
          },
        };
      },
    },
    {
      title: "Razão Social",
      dataIndex: "razaoSocial",
      key: "razaoSocial",
      onCell: () => {
        return {
          onClick: () => {
            navigate("/PCMSO/Cadastrar");
          },
        };
      },
    },
    {
      title: "Emissão",
      key: "emissao",
      dataIndex: "emissao",
      onCell: () => {
        return {
          onClick: () => {
            navigate("/PCMSO/Cadastrar");
          },
        };
      },
    },
    {
      title: "Vencimento",
      key: "vencimento",
      dataIndex: "vencimento",
      onCell: () => {
        return {
          onClick: () => {
            navigate("/PCMSO/Cadastrar");
          },
        };
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      onCell: () => {
        return {
          onClick: () => {
            navigate("/PCMSO/Cadastrar");
          },
        };
      },
    },
    {
      title: "Ações",
      key: "acao",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Tem certeza que deseja excluir?"
            onConfirm={() => {}}
            okText="Sim"
            cancelText="Cancelar"
          >
            <Tooltip title="Excluir">
              <Button
                className="senai-btn-danger"
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>

          <Tooltip title="Exibir Detalhes">
            <Button
              className="senai-btn-info"
              shape="circle"
              onClick={() => {
                navigate('/PCMSO/Cadastrar')
              }}
            >
              <InfoOutlined className="senai-icon" />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const getPCMSOs = useCallback(
    async (params: any) => {
      try {
        const response = await axiosPrivate.get("/user", {
          params: { empresa: params },
        });
        // Process response or set state if needed
      } catch (error) {
        // Handle error
      }
    },
    [axiosPrivate]
  );

  useEffect(() => {
    getPCMSOs("");
  }, [getPCMSOs]);

  return (
    <>
      <div
        className="flex justify-space-between"
        style={{ marginBottom: "1rem" }}
      >
        <div></div>

        <div>
          
          <Button
            className="senai-btn-success"
            onClick={() => {
              navigate("/PCMSO/Cadastrar");
            }}
          >
            <PlusOutlined className="senai-icon" />
            Adicionar
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={pcmsos} />
    </>
  );
}

export default PCMSO;
