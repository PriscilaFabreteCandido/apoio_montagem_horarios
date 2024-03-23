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
  Checkbox,
  Space,
  Row,
  Col,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { CardFooter } from "../../../components/CardFooter";
import { ColumnsType } from "antd/es/table";
import { get, post, put, remove } from "../../../api/axios";

interface ProfessorType {
  key: React.Key;
  id: number;
  matricula: string;
  nome: string;
  professor: boolean;
}

const Professores: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [professorToEdit, setProfessorToEdit] = useState<ProfessorType | null>(
    null
  );
  const [professores, setProfessores] = useState<ProfessorType[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setProfessorToEdit(null);
    setIsOpenModal(false);
  };

  const getProfessores = async () => {
    setLoading(true);
    try {
      const response: ProfessorType[] = await get("professores");
      setProfessores(response);
    } catch (error) {
      console.error("Erro ao obter professores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfessores();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      const professorData = {
        matricula: values.matricula,
        nome: values.nome,
        professor: values.professor,
        id: professorToEdit ? professorToEdit.id : null,
      };

      if (!professorToEdit) {
        const response = await post("professores/create", professorData);
        setProfessores([...professores, response]);
        message.success("Professor criado com sucesso");
      } else {
        const response = await put(
          `professores/update/${professorToEdit.id}`,
          professorData
        );
        setProfessores(
          professores.map((professor) =>
            professor.id === response.id ? response : professor
          )
        );
        message.success("Professor editado com sucesso");
      }

      handleCancel();
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };

  const onDelete = async (id: number) => {
    try {
      await remove(`professores/delete/${id}`);
      setProfessores(professores.filter((professor) => professor.id !== id));
      message.success("Professor excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir professor:", error);
    }
  };

  const columns: ColumnsType<ProfessorType> = [
    {
      title: "Matrícula",
      dataIndex: "matricula",
    },
    {
      title: "Nome",
      dataIndex: "nome",
    },
    {
      title: "Coordenador",
      dataIndex: "professor",
      render: (professor) => (professor ? "Sim" : "Não"),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Editar">
            <Button
              className="ifes-btn-warning"
              shape="circle"
              onClick={() => {
                setProfessorToEdit(record);
                form.setFieldsValue({
                  matricula: record.matricula,
                  nome: record.nome,
                  professor: record.professor,
                });
                setIsOpenModal(true);
              }}
            >
              <EditOutlined className="ifes-icon" />
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Popconfirm
              title="Tem certeza que deseja excluir este professor?"
              onConfirm={() => onDelete(record.id)}
              okText="Sim"
              cancelText="Cancelar"
            >
              <Button
                className="ifes-btn-danger"
                shape="circle"
                onClick={() => {}}
              >
                <DeleteOutlined className="ifes-icon" />
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
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
      <Table columns={columns} dataSource={professores} loading={loading} />

      {/* Modal */}
      <Modal
        title="Adicionar Professor"
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="matricula"
            label="Matrícula"
            rules={[
              { required: true, message: "Por favor, insira a matrícula!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nome"
            label="Nome"
            rules={[
              {
                required: true,
                message: "Por favor, insira o nome do professor!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Coordenador"
            name="coordenador"
            style={{ marginBottom: 0 }}
            labelCol={{ span: 8 }} // Define a largura da coluna do rótulo
            wrapperCol={{ span: 20 }} // Define a largura da coluna do conteúdo
          >
            <Checkbox />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Professores;
