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
  Space,
  Select
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CardFooter } from "../../../components/CardFooter";
import { ColumnsType } from "antd/es/table";
import { get, post, put, remove } from "../../../api/axios";

interface DisciplinaType {
  key: React.Key;
  id: number;
  nome: string;
}

const Disciplinas: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [disciplinaToEdit, setDisciplinaToEdit] = useState<DisciplinaType | null>(null);
  const [disciplinas, setDisciplinas] = useState<DisciplinaType[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setDisciplinaToEdit(null);
    setIsOpenModal(false);
  };

  const getDisciplinas = async () => {
    setLoading(true);
    try {
      const response: DisciplinaType[] = await get("disciplinas");
      setDisciplinas(response);
    } catch (error) {
      console.error("Erro ao obter disciplinas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDisciplinas();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
  
      console.log("Objeto enviado para criação:", values); // Adicionando console.log para verificar o objeto enviado
  
      const disciplinaData = {
        nome: values.nome,
        id: disciplinaToEdit ? disciplinaToEdit.id : null,
      };
  
      if (!disciplinaToEdit) {
        const response = await post("disciplinas/create", disciplinaData);
        setDisciplinas([...disciplinas, response]);
        message.success("Disciplina criada com sucesso");
      } else {
        const response = await put(
          `disciplinas/update/${disciplinaToEdit.id}`,
          disciplinaData
        );
        setDisciplinas(
          disciplinas.map((disciplina) =>
            disciplina.id === response.id ? response : disciplina
          )
        );
        message.success("Disciplina editada com sucesso");
      }
  
      handleCancel();
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };
  

  const onDelete = async (id: number) => {
    try {
      await remove(`disciplinas/delete/${id}`);
      setDisciplinas(disciplinas.filter((disciplina) => disciplina.id !== id));
      message.success("Disciplina excluída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir disciplina:", error);
    }
  };

  const columns: ColumnsType<DisciplinaType> = [
    {
      title: "Nome",
      dataIndex: "nome",
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
                setDisciplinaToEdit(record);
                form.setFieldsValue({
                  nome: record.nome
                });
                setIsOpenModal(true);
              }}
            >
              <EditOutlined className="ifes-icon" />
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Popconfirm
              title="Tem certeza que deseja excluir esta disciplina?"
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
      <Table columns={columns} dataSource={disciplinas} loading={loading} />

      {/* Modal */}
      <Modal
        title="Adicionar Disciplina"
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nome"
            label="Nome"
            rules={[
              { required: true, message: "Por favor, insira o nome da disciplina!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Disciplinas;
