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
  Space
} from "antd";
import { DeleteOutlined, PlusOutlined, EditOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { get, post, put, remove } from "../../api/axios";
import { ColumnsType } from "antd/es/table";
import { CardFooter } from "../../components/CardFooter";
import moment from "moment";

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
      // Ordenar os dados por data e hora
      response.sort((a, b) => {
        const dataA: moment.Moment = moment(a.data + ' ' + a.horaInicio, 'YYYY-MM-DD HH:mm');
        const dataB: moment.Moment = moment(b.data + ' ' + b.horaInicio, 'YYYY-MM-DD HH:mm');
        return dataA.diff(dataB);
      });
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
  
      console.log(values)
  
      let data = {
        descricao: values.descricao,
        data: values.data,
        horaInicio: values.horaInicio,
        horaFim: values.horaFim,
        id: entityToEdit ? entityToEdit.id : null
      };
  
      let response;
      if (!entityToEdit) {
        response = await post("eventos/create", data);
        message.success("Alocação criada com sucesso");
      } else {
        response = await put(`eventos/update/${entityToEdit.id}`, data);
        message.success("Alocação editada com sucesso");
      }
  
      // Adicionando ou editando, ordenando novamente os dados
      const updatedAlocacoes = [...alocacoes, response].sort((a, b) => {
        const dataA: moment.Moment = moment(a.data + ' ' + a.horaInicio, 'YYYY-MM-DD HH:mm');
        const dataB: moment.Moment = moment(b.data + ' ' + b.horaInicio, 'YYYY-MM-DD HH:mm');
        return dataA.diff(dataB);
      });
  
      setAlocacoes(updatedAlocacoes);
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
      title: "Data",
      dataIndex: "data",
      render: (data: string) => moment(data).format("DD/MM/YYYY"),
      sorter: (a: any, b: any) => moment(a.data).diff(moment(b.data)),
    },
    {
      title: "Início",
      dataIndex: "horaInicio",
      render: (horaInicio: string) => moment(horaInicio, "HH:mm:ss").format("HH:mm"),
      sorter: (a: any, b: any) => moment(a.horaInicio, "HH:mm:ss").diff(moment(b.horaInicio, "HH:mm:ss")),
    },
    {
      title: "Término",
      dataIndex: "horaFim",
      render: (horaFim: string) => moment(horaFim, "HH:mm:ss").format("HH:mm"),
      sorter: (a: any, b: any) => moment(a.horaFim, "HH:mm:ss").diff(moment(b.horaFim, "HH:mm:ss")),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <span>
          <Space size="middle">
          <Tooltip title="Editar">
          <Button
            className="ifes-btn-warning"
            shape="circle"
            onClick={() => {
              setEntityToEdit(record);
              form.setFieldsValue({
                descricao: record.descricao,
                data: moment(record.data).format("YYYY-MM-DD"), // Mantenha no formato de string
                horaInicio: moment(record.horaInicio, "HH:mm").format("HH:mm"), // Formate corretamente a hora de início
                horaFim: moment(record.horaFim, "HH:mm").format("HH:mm") // Formate corretamente a hora de término
              });
              setIsOpenModal(true);
            }}
          >
            <EditOutlined className="ifes-icon" />
          </Button>
        </Tooltip>
          <Tooltip title="Excluir">
            <Popconfirm
              title="Tem certeza que deseja excluir este evento?"
              onConfirm={() => onDelete(record.id)}
              okText="Yes"
              cancelText="No"
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
        </span>
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
            label="Data"
            rules={[{ required: true, message: "Por favor, insira o dia!" }]}
          >
          
          <Input type="date" />
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
            <Input type="time" />
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
            <Input type="time" />
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
