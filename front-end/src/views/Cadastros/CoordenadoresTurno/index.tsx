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
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CardFooter } from "../../../components/CardFooter";
import { ColumnsType } from "antd/es/table";
import { get, post, put, remove } from "../../../api/axios";
import { nodeModuleNameResolver } from "typescript";

interface CoordenadoresType {
  key: React.Key;
  id: number;
  nome: string;
}

const CoordenadoresTurno: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [coordenadoriaToEdit, setCoordenadoriaToEdit] = useState<CoordenadoresType | null>(null);
  const [coordenadorias, setCoordenadorias] = useState<CoordenadoresType[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setCoordenadoriaToEdit(null);
    setIsOpenModal(false);
  };

  const getCoordenadorias = async () => {
    setLoading(true);
    try {
      const response: CoordenadoresType[] = await get("coordenadoresTurno");
      setCoordenadorias(response);
    } catch (error) {
      console.error("Erro ao obter coordenadorias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoordenadorias();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      const coordenadoriaData = {
        nome: values.nome,
        id: coordenadoriaToEdit ? coordenadoriaToEdit.id : null,
      };

      if (!coordenadoriaToEdit) {
        const response = await post("coordenadoresTurno/create", coordenadoriaData);
        setCoordenadorias([...coordenadorias, response]);
        message.success("Coordenadoria criada com sucesso");
      } else {
        const response = await put(
          `coordenadoresTurno/update/${coordenadoriaToEdit.id}`,
          coordenadoriaData
        );
        setCoordenadorias(
          coordenadorias.map((coordenadoria) =>
            coordenadoria.id === response.id ? response : coordenadoria
          )
        );
        message.success("Coordenadoria editada com sucesso");
      }

      handleCancel();
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        showError("Erro ao processar o formulário: " + error.response.data.message);
      }
    }
  };

  const showError = (errorMessage: string) => {
    message.error(errorMessage);
  };


  const onDelete = async (id: number) => {
    try {
      await remove(`coordenadoresTurno/delete/${id}`);
      setCoordenadorias(coordenadorias.filter((coordenadoria) => coordenadoria.id !== id));
      message.success("Coordenadoria excluída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir coordenadoria:", error);
    }
  };

  const columns: ColumnsType<CoordenadoresType> = [
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
                setCoordenadoriaToEdit(record);
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
              title="Tem certeza que deseja excluir esta coordenadoria?"
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
      <Table columns={columns} dataSource={coordenadorias} loading={loading} />

      {/* Modal */}
      <Modal
        title="Adicionar Coordenadores de Turno"
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nome"
            label="Nome"
            rules={[
              { required: true, message: "Por favor, insira o nome do coordenador de turno!" },
            ]}
          >
            <Input />
          </Form.Item>
         
        </Form>
      </Modal>
    </>
  );
};

export default CoordenadoresTurno;
