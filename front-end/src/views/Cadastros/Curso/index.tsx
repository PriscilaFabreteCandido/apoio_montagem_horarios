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

interface CursoType {
  key: React.Key;
  id: number;
  nome: string;
  coordenadoria: CoordenadoriaType; // Adicione coordenadoria ao CursoType
}
interface CoordenadoriaType {
  id: number;
  descricao: string;
}

const Cursos: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [cursoToEdit, setCursoToEdit] = useState<CursoType | null>(null);
  const [cursos, setCursos] = useState<CursoType[]>([]);
  const [coordenadorias, setCoordenadorias] = useState<CoordenadoriaType[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setCursoToEdit(null);
    setIsOpenModal(false);
  };

  const getCursos = async () => {
    setLoading(true);
    try {
      const response: CursoType[] = await get("cursos");
      setCursos(response);
    } catch (error) {
      console.error("Erro ao obter cursos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCursos();
  }, []);

  const getCoordenadorias = async () => {
    try {
      const response: CoordenadoriaType[] = await get("coordenadorias");
      setCoordenadorias(response);
    } catch (error) {
      console.error("Erro ao obter coordenadorias:", error);
    }
  };

  useEffect(() => {
    getCoordenadorias();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      const coordenadoriaSelecionada = coordenadorias.find(coordenadoria => coordenadoria.id === values.coordenadoria);
      const cursoData = {
        nome: values.nome,
        coordenadoria: coordenadoriaSelecionada,
        id: cursoToEdit ? cursoToEdit.id : null,
      };

      if (!cursoToEdit) {
        const response = await post("cursos/create", cursoData);
        setCursos([...cursos, response]);
        message.success("Curso criado com sucesso");
      } else {
        const response = await put(
          `cursos/update/${cursoToEdit.id}`,
          cursoData
        );
        setCursos(
          cursos.map((curso) =>
            curso.id === response.id ? response : curso
          )
        );
        message.success("Curso editado com sucesso");
      }

      handleCancel();
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };

  const onDelete = async (id: number) => {
    try {
      await remove(`cursos/delete/${id}`);
      setCursos(cursos.filter((curso) => curso.id !== id));
      message.success("Curso excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir curso:", error);
    }
  };

  const columns: ColumnsType<CursoType> = [
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
                setCursoToEdit(record);
                form.setFieldsValue({
                  nome: record.nome,
                  coordenadoria: record.coordenadoria.id, // Definir a coordenadoria selecionada na combobox
                });
                setIsOpenModal(true);
              }}
            >
              <EditOutlined className="ifes-icon" />
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Popconfirm
              title="Tem certeza que deseja excluir este curso?"
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
      <Table columns={columns} dataSource={cursos} loading={loading} />

      {/* Modal */}
      <Modal
        title="Adicionar Curso"
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nome"
            label="Nome"
            rules={[
              { required: true, message: "Por favor, insira o nome do curso!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="coordenadoria"
            label="Coordenadoria"
            rules={[
              { required: true, message: "Por favor, selecione a coordenadoria!" },
            ]}
          >
            <Select>
              {coordenadorias.length > 0 ? (
                coordenadorias.map((coordenadoria) => (
                  <Select.Option key={coordenadoria.id} value={coordenadoria.id}>
                    {coordenadoria.descricao}
                  </Select.Option>
                ))
              ) : (
                <Select.Option value={null} disabled>
                  Nenhuma coordenadoria disponível
                </Select.Option>
              )}
            </Select>
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
};

export default Cursos;