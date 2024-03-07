import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  Space,
  Switch,
  Table,
  Tooltip,
  Typography,
  Modal,
  Form,
} from "antd";
import {
  DeleteOutlined,
  InfoOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { CardFooter } from "../../../components/CardFooter";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  id: number;
  codigoESocial: string;
  exame: string;
}

const Equipamentos: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      // Aqui você pode lidar com os valores do formulário
      console.log(values);
      // Limpar o formulário
      form.resetFields();
      setIsOpenModal(false);
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Nome",
      dataIndex: "nome",
      sorter: (a: any, b: any) => a.nome.length - b.nome.length,
      sortDirections: ["descend"],
    },
    {
      title: "Ações",
      key: "acao",
      render: (acao, record: any) => (
        <Space size="middle">
          <Tooltip title="Excluir">
            <Button
              className="senai-btn-danger"
              shape="circle"
              onClick={() => {}}
            >
              <DeleteOutlined className="senai-icon" />
            </Button>
          </Tooltip>

          <Tooltip title="Detalhes">
            <Button
              className="senai-btn-info"
              shape="circle"
              onClick={() => {}}
            >
              <InfoOutlined className="senai-icon" />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <CardFooter>
        <div className="flex justify-content-between">
          {/* Filtros */}
          <div className="flex filtros-card">
          
          </div>

          <div>
            <Button
              className="senai-btn-success"
              onClick={showModal}
            >
              <PlusOutlined className="senai-icon" />
              Adicionar
            </Button>
          </div>
        </div>
      </CardFooter>

      {/* Tabela */}
      <Table columns={columns} dataSource={[]} />

      {/* Modal */}
      <Modal
        title="Adicionar Equipamento"
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nome"
            label="Nome"
            rules={[{ required: true, message: "Por favor, insira o nome!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Equipamentos;
