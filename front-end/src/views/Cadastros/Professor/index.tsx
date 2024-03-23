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
  Switch
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { CardFooter } from "../../../components/CardFooter";
import { ColumnsType } from "antd/es/table";
import { get, post, put, remove } from "../../../api/axios";
import { Select } from "antd";
const { Option } = Select;

interface ProfessorType {
  key: React.Key;
  id: number;
  matricula: string;
  nome: string;
  coordenador: boolean;
  coordenadoria: CoordenadoriaType;
}
interface CoordenadoriaType {
  id: number;
  descricao: string;
}

const Professores: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [professorToEdit, setProfessorToEdit] = useState<ProfessorType | null>(
    null
  );
  const [professores, setProfessores] = useState<ProfessorType[]>([]);
  const [coordenadorias, setCoordenadorias] = useState<CoordenadoriaType[]>([]);
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

  const getCoordenadorias = async () => {
    try {
      const response: CoordenadoriaType[] = await get("coordenadorias"); // Fazer a requisição para obter as coordenadorias
      setCoordenadorias(response); // Atualizar o estado das coordenadorias
    } catch (error) {
      console.error("Erro ao obter coordenadorias:", error);
    }
  };

  useEffect(() => {
    getCoordenadorias(); // Chamar a função para obter as coordenadorias ao carregar a página
  }, []);

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
  
      // Convertendo o valor do campo coordenador para booleano
      const isCoordenador = values.coordenador === true;
  
      const coordenadoriaSelecionada = coordenadorias.find(coordenadoria => coordenadoria.id === values.coordenadoria);
      const professorData = {
        matricula: values.matricula,
        nome: values.nome,
        coordenador: isCoordenador, // Usando o valor convertido para booleano
        coordenadoria: coordenadoriaSelecionada,
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
      title: "Nome",
      dataIndex: "nome",
      render: (text, record) => (
        <span style={{ fontSize: 'inherit' }}>
          {text} {record.coordenador && <span style={{ color: 'green' }}> (Coordenador)</span>}
        </span>
      ),
    },
    {
      title: "Matrícula",
      dataIndex: "matricula",
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
                  nome: record.nome,
                  matricula: record.matricula,
                  coordenador: record.coordenador,
                  coordenadoria: record.coordenadoria.id,
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
            name="matricula"
            label="Matrícula"
            rules={[
              { required: true, message: "Por favor, insira a matrícula!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Combobox para as coordenadorias */}
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


          {/* Checkbox para o coordenador */}
          <Form.Item
            label="Coordenador"
            name="coordenador"
            style={{ marginBottom: 0 }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 20 }}
          >
            <Switch />
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
};

export default Professores;