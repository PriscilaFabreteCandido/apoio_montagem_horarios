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
  Select,
  DatePicker,
  TimePicker,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { get, post, put, remove } from "../../api/axios";
import { ColumnsType } from "antd/es/table";
import { CardFooter } from "../../components/CardFooter";

interface DataType {
  key: React.Key;
  id: number;
  descricao: string;
  data: string;
  horaInicio: string;
  horaFim: string;
}

const Alocacoes: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalAlocarSala, setIsOpenModalAlocarSala] = useState(false);
  const [entityToEdit, setEntityToEdit] = useState<any>();
  const [alocacoes, setAlocacoes] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>();

  const showModal = () => {
    setIsOpenModal(true);
  };

  const showModalAlocarSala = () => {
    setIsOpenModalAlocarSala(true);
  };

  const handleCancel = async () => {
    await form.resetFields();
    setEntityToEdit(null);
    setIsOpenModal(false);
    setIsOpenModalAlocarSala(false);
  };

  const getAlocacoes = async () => {
    try {
      setLoading(true);
      const response: any[] = await get("eventos");
      setAlocacoes(response);
    } catch (error) {
      console.error("Erro ao obter alocações:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAlocacoes();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      let data = {
        descricao: values.descricao,
        data: values.data.format("YYYY-MM-DD"),
        horaInicio: values.horaInicio.format("HH:mm:ss"),
        horaFim: values.horaFim.format("HH:mm:ss"),
        id: entityToEdit ? entityToEdit.id : null,
      };

      if (!entityToEdit) {
        const response = await post("eventos/create", data);
        setAlocacoes([...alocacoes, response]);
        message.success("Alocação criada com sucesso");
      } else {
        const response = await put(`alocacoes/update/${entityToEdit.id}`, data);
        setAlocacoes(
          alocacoes.map((alocacao) =>
            alocacao.id === response.id ? response : alocacao
          )
        );
        message.success("Alocação editada com sucesso");
      }

      handleCancel();
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };

  const onDelete = async (id: number) => {
    try {
      await remove(`eventos/delete/${id}`);
      setAlocacoes(alocacoes.filter((alocacao) => alocacao.id !== id));
      message.success("Alocação excluída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir alocação:", error);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Nome",
      dataIndex: "descricao",
      sorter: (a: any, b: any) => a.descricao.localeCompare(b.descricao),
    },
    {
      title: "Dia",
      dataIndex: "data",
    },
    {
      title: "Início",
      dataIndex: "horaInicio",
    },
    {
      title: "Término",
      dataIndex: "horaFim",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Tooltip title="Excluir">
          <Popconfirm
            title="Tem certeza que deseja excluir esta alocação?"
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

          <div >
            <Button style={{marginRight: '1rem'}} type="primary" className="ifes-btn-help" onClick={showModal} icon={<PlusOutlined />}>
              Alocar Eventos
            </Button>

            <Button type="primary" onClick={showModalAlocarSala} icon={<PlusOutlined />}>
              Alocar Salas
            </Button>
          </div>
        </div>
      </CardFooter>

      {/* Tabela */}
      <Table columns={columns} dataSource={alocacoes} loading={loading} />

      {/* Modal */}
      <Modal
        title="Alocar Evento"
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
          <Form.Item
            name="data"
            label="Dia"
            rules={[{ required: true, message: "Por favor, insira o dia!" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="horaInicio"
            label="Início"
            rules={[
              {
                required: true,
                message: "Por favor, insira o horário de início!",
              },
            ]}
          >
            <TimePicker format="HH:mm:ss" />
          </Form.Item>
          <Form.Item
            name="horaFim"
            label="Término"
            rules={[
              {
                required: true,
                message: "Por favor, insira o horário de término!",
              },
            ]}
          >
            <TimePicker format="HH:mm:ss" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal para alocar sala */}
      <Modal
        title="Alocar Sala"
        visible={isOpenModalAlocarSala}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="local"
            label="Local"
            rules={[{ required: true, message: "Por favor, selecione o local!" }]}
          >
            <Select>
              {/* Opções de locais */}
            </Select>
          </Form.Item>
          <Form.Item
            name="disciplina"
            label="Disciplina"
            rules={[{ required: true, message: "Por favor, insira a disciplina!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="professor"
            label="Professor"
            rules={[{ required: true, message: "Por favor, insira o professor!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="periodo"
            label="Período"
            rules={[{ required: true, message: "Por favor, selecione o período!" }]}
          >
            <Select>
              {/* Opções de períodos */}
            </Select>
          </Form.Item>
          <Form.Item
            name="dia"
            label="Dia"
            rules={[{ required: true, message: "Por favor, selecione o dia!" }]}
          >
            <Select>
              {/* Opções de dias */}
            </Select>
          </Form.Item>
          <Form.Item
            name="inicio"
            label="Início"
            rules={[
              {
                required: true,
                message: "Por favor, insira o horário de início!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="termino"
            label="Término"
            rules={[
              {
                required: true,
                message: "Por favor, insira o horário de término!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="semestre"
            label="Semestre"
            rules={[{ required: true, message: "Por favor, insira o semestre!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Alocacoes;
