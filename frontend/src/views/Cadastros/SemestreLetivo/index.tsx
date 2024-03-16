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

interface SemestreType {
  key: React.Key;
  id: number;
  ano: number;
  semestre: string;
  data_fim: string;
  data_inicio: string;
}

const SemestresLetivos: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [semestreToEdit, setSemestreToEdit] = useState<SemestreType | null>(null);
  const [semestres, setSemestres] = useState<SemestreType[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setSemestreToEdit(null);
    setIsOpenModal(false);
  };

  const getSemestres = async () => {
    setLoading(true);
    try {
      const response: SemestreType[] = await get("semestres");
      setSemestres(response);
    } catch (error) {
      // Lidar com erros de requisição
      console.error("Erro ao obter semestres:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSemestres();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      
      const semestreData = {
        ano: values.ano,
        semestre: values.semestre,
        data_inicio: values.data_inicio,
        data_fim: values.data_fim,
        id: semestreToEdit ? semestreToEdit.id : null,
      };

      if (!semestreToEdit) {
        const response = await post("semestres/create", semestreData);
        setSemestres([...semestres, response]);
        message.success("Semestre letivo criado com sucesso");
      } else {
        const response = await put(`semestres/update/${semestreToEdit.id}`, semestreData);
        setSemestres(semestres.map(semestre => (semestre.id === response.id ? response : semestre)));
        message.success("Semestre letivo editado com sucesso");
      }

      handleCancel();
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };

  const onDelete = async (id: number) => {
    try {
      await remove(`semestres/delete/${id}`);
      setSemestres(semestres.filter(semestre => semestre.id !== id));
      message.success("Semestre letivo excluído com sucesso");
    } catch (error) {
      // Lidar com erros de exclusão
      console.error("Erro ao excluir semestre letivo:", error);
    }
  };

  const columns: ColumnsType<SemestreType> = [
    {
      title: "Ano",
      dataIndex: "ano",
      sorter: (a, b) => a.ano - b.ano,
    },
    {
      title: "Semestre",
      dataIndex: "semestre",
    },
    {
      title: "Data de Início",
      dataIndex: "data_inicio",
    },
    {
      title: "Data de Fim",
      dataIndex: "data_fim",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Tooltip title="Excluir">
          <Popconfirm
            title="Tem certeza que deseja excluir este semestre?"
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
      <Table columns={columns} dataSource={semestres} loading={loading} />

      {/* Modal */}
      <Modal
        title="Adicionar Semestre Letivo"
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="ano"
            label="Ano"
            rules={[{ required: true, message: "Por favor, insira o ano!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="semestre"
            label="Semestre"
            rules={[{ required: true, message: "Por favor, insira o semestre!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="data_inicio"
            label="Data de Início"
            rules={[{ required: true, message: "Por favor, insira a data de início!" }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="data_fim"
            label="Data de Fim"
            rules={[{ required: true, message: "Por favor, insira a data de fim!" }]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SemestresLetivos;
