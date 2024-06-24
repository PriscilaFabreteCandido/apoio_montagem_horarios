import React, { useEffect, useState } from "react";
import { Button, Input, Table, Tooltip, Modal, Form, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CardFooter } from "../../../components/CardFooter";
import { ColumnsType } from "antd/es/table";
import { get, post, put, remove } from "../../../api/axios";

interface TurmaType {
  key: React.Key;
  id: number;
  nome: string;
}

const Turmas: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [turmaToEdit, setTurmaToEdit] = useState<TurmaType | null>(null);
  const [turmas, setTurmas] = useState<TurmaType[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setTurmaToEdit(null);
    setIsOpenModal(false);
  };

  const getTurmas = async () => {
    setLoading(true);
    try {
      const response: TurmaType[] = await get("turmas");
      console.log("Dados das turmas obtidos com sucesso:", response); // Adicione este console.log
      setTurmas(response);
    } catch (error) {
      console.error("Erro ao obter turmas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTurmas();
  }, []);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
  
      const turmaData = {
        nome: values.nome,
        id: turmaToEdit ? turmaToEdit.id : null,
      };
  
      if (!turmaToEdit) {
        const response = await post("turmas/create", turmaData);
        setTurmas([...turmas, response]);
        message.success("Turma criada com sucesso");
      } else {
        const response = await put(`turmas/update/${turmaToEdit.id}`, turmaData);
        setTurmas(turmas.map((turma) => (turma.id === response.id ? response : turma)));
        message.success("Turma editada com sucesso");
      }
  
      // Limpar os campos do formulário e o estado de turma a ser editada
      form.resetFields();
      setTurmaToEdit(null);
    } catch (error: any) {
      console.error("Erro ao processar o formulário:", error);
      if (error.response && error.response.data && error.response.data.message) {
        showError("Erro ao processar o formulário: " + error.response.data.message);
      }
  
      return; // Não fecha a modal se a validação falhar
    }
  
    // Fechar a modal após a conclusão da operação
    setIsOpenModal(false);
  };
  
  const showError = (errorMessage: string) => {
    message.error(errorMessage);
  };

  const onDelete = async (id: number) => {
    try {
      await remove(`turmas/delete/${id}`);
      setTurmas(turmas.filter((turma) => turma.id !== id));
      message.success("Turma excluída com sucesso");
    } catch (error: any) {
      showError("Erro ao processar o formulário: " + error.response.data.message);
      console.error("Erro ao excluir turma:", error);
    }
  };

  const columns: ColumnsType<TurmaType> = [
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
                setTurmaToEdit(record);
                form.setFieldsValue({
                  nome: record.nome,
                });
                setIsOpenModal(true);
              }}
            >
              <EditOutlined className="ifes-icon" />
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Popconfirm
              title="Tem certeza que deseja excluir esta turma?"
              onConfirm={() => onDelete(record.id)}
              okText="Sim"
              cancelText="Cancelar"
            >
              <Button className="ifes-btn-danger" shape="circle" onClick={() => {}}>
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
      <Table columns={columns} dataSource={turmas} loading={loading} />


      {/* Modal */}
      <Modal
        title={turmaToEdit ? "Editar Turma" : "Adicionar Turma"}
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nome"
            label="Nome"
            rules={[
              { required: true, message: "Por favor, insira o nome da turma!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Turmas;
