import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Table,
  Tooltip,
  Modal,
  Form,
  message,
  Popconfirm,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { CardFooter } from "../../../components/CardFooter";
import { ColumnsType } from "antd/es/table";
import { get, post, put, remove } from "../../../api/axios";

interface DataType {
  key: React.Key;
  descricao: string;
}

const Locais: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [entityToEdit, setEntityToEdit] = useState<any>();
  const [locais, setLocais] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>();

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = async () => {
    await form.resetFields();
    setEntityToEdit(null);
    setIsOpenModal(false);
  };

  const getLocais = async () => {
    try {
      setLoading(true);
      const response: any[] = await get("locais");
      setLocais(response);
    } catch (error) {
      console.error("Erro ao obter locais:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocais();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      let data = {
        descricao: values.descricao,
        id: entityToEdit ? entityToEdit.id : null,
      };

      if (!entityToEdit) {
        const response = await post("locais/create", data);
        setLocais([...locais, response]);
        message.success("Local criado com sucesso");
      } else {
        const response = await put(`locais/update/${entityToEdit.id}`, data);
        setLocais(locais.map(local => (local.id === response.id ? response : local)));
        message.success("Local editado com sucesso");
      }

      handleCancel();
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };

  const onDelete = async (id: number) => {
    try {
      await remove(`locais/delete/${id}`);
      setLocais(locais.filter(local => local.id !== id));
      message.success("Local excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir local:", error);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Nome",
      dataIndex: "descricao",
      sorter: (a: any, b: any) => a.descricao.localeCompare(b.descricao),
      sortDirections: ["descend"],
    },
    {
      title: "Ações",
      key: "action",
      render: (_, record: any) => (
        <Tooltip title="Excluir">
          <Popconfirm
            title="Tem certeza que deseja excluir este local?"
            onConfirm={() => onDelete(record.id)}
            okText="Sim"
            cancelText="Cancelar"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      {/* Header */}
      <CardFooter>
        <div className="flex justify-content-between">
          {/* Filtros */}
          <div className="flex filtros-card"></div>

          <div>
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
              Adicionar
            </Button>
          </div>
        </div>
      </CardFooter>

      {/* Tabela */}
      <Table columns={columns} dataSource={locais} loading={loading} />

      {/* Modal */}
      <Modal
        title="Adicionar Local"
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="descricao"
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

export default Locais;
