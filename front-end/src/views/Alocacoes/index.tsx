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
  Space,
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
  local: {
    id: number;
    descricao: string;
  };
}

const { Option } = Select;

const Alocacoes: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalAlocarSala, setIsOpenModalAlocarSala] = useState(false);
  const [entityToEdit, setEntityToEdit] = useState<any>();
  const [alocacoes, setAlocacoes] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>();
  const [locais, setLocais] = useState<any[]>([]);

  const showModal = () => {
    setIsOpenModal(true);
  };

  const getLocais = async () => {
    try {
      const response = await get("locais");
      setLocais(response);
    } catch (error) {
      console.error("Erro ao obter locais:", error);
    }
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
    getLocais();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
  
      console.log(values);
  
      // Prepare os dados para a requisição
      let data = {
        descricao: values.descricao,
        local: locais.find((local) => local.id === values.localId),
        data: values.data,
        horaInicio: values.horaInicio,
        horaFim: values.horaFim,
        id: entityToEdit ? entityToEdit.id : null
      };
  
      let response: DataType;  // Define explicitamente o tipo da variável response
  
      if (!entityToEdit) {
        // Criação de nova alocação
        response = await post("eventos/create", data) as DataType;
        message.success("Alocação criada com sucesso");
        // Adiciona o novo evento à lista
        setAlocacoes([...alocacoes, response]);
      } else {
        // Edição de alocação existente
        response = await put(`eventos/update/${entityToEdit.id}`, data) as DataType;
        message.success("Alocação editada com sucesso");
  
        // Atualiza a lista substituindo a alocação editada
        const updatedAlocacoes = alocacoes.map((alocacao) =>
          alocacao.id === entityToEdit.id ? response : alocacao
        );
        setAlocacoes([...updatedAlocacoes].sort((a, b) => {
          const dataA: moment.Moment = moment(a.data + ' ' + a.horaInicio, 'YYYY-MM-DD HH:mm');
          const dataB: moment.Moment = moment(b.data + ' ' + b.horaInicio, 'YYYY-MM-DD HH:mm');
          return dataA.diff(dataB);
        }));
        
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
      title: "Local",
      dataIndex: "local",
      key: "local",
      render: (local: any) => local ? local.descricao : "N/A", // Provide a default value when local is null
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
                localId: record.local.id,
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
            name="localId"
            label="Local"
            rules={[
              {
                required: true,
                message: "Por favor, selecione o local!",
              },
            ]}
          >
            <Select>
              {locais &&
                locais.length > 0 &&
                locais.map((local) => (
                  <Option key={local.id} value={local.id}>
                    {local.descricao}
                  </Option>
                ))}
            </Select>
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
    </>
  );
};

export default Alocacoes;
