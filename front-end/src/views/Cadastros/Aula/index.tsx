import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  Table,
  Tooltip,
  Modal,
  Form,
  message,
  Popconfirm,
  Space,
  TimePicker,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CardFooter } from "../../../components/CardFooter";
import { ColumnsType } from "antd/es/table";
import { get, post, put, remove } from "../../../api/axios";
import moment from "moment";

interface AulaType {
  key: React.Key;
  id: number;
  data: string; // Data apenas (sem hora)
  horaInicio: string; // Hora de início (sem data)
  horaFim: string; // Hora de fim (sem data)
}

const Aulas: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [aulaToEdit, setAulaToEdit] = useState<AulaType | null>(null);
  const [aulas, setAulas] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setAulaToEdit(null);
    setIsOpenModal(false);
  };

  const getAulas = async () => {
    setLoading(true);
    try {
      // Simulando obtenção de dados de aulas
      // Suponha que você tenha um endpoint para obter dados de aulas
      const response = await get("aulas");
      setAulas(response);
    } catch (error) {
      console.error("Erro ao obter aulas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAulas();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      const aulaData = {
        data: moment(values.data).format("YYYY-MM-DD"),
        horaInicio: values.horaInicio,
        horaFim: values.horaFim,
        id: aulaToEdit ? aulaToEdit.id : null,
      };

      if (!aulaToEdit) {
        // Simulando a criação de uma aula
        const response = await post("aulas/create", aulaData);
        setAulas([...aulas, response]);
        message.success("Aula criada com sucesso");
      } else {
        const response = await put(`cursos/update/${aulaToEdit.id}`, aulaData);
        setAulas(aulas.map((a) => (a.id === response.id ? response : a)));
        message.success("Aula editada com sucesso");
      }

      handleCancel();
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };

  const onDelete = async (id: number) => {
    try {
      // Simulando a exclusão de uma aula
      setAulas(aulas.filter((aula) => aula.id !== id));
      message.success("Aula excluída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir aula:", error);
    }
  };

  const columns: ColumnsType<AulaType> = [
    {
      title: "Data",
      dataIndex: "data",
      render: (data) => moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "Hora Início",
      dataIndex: "horaInicio",
      // render: (horaInicio) => moment(horaInicio).format("HH:mm"),
    },
    {
      title: "Hora Fim",
      dataIndex: "horaFim",
      // render: (horaInicio) => moment(horaInicio).format("HH:mm"),
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
                setAulaToEdit(record);
                form.setFieldsValue({
                  data: moment(record.data),
                  horaInicio: record.horaInicio,
                  horaFim: record.horaFim,
                });
                setIsOpenModal(true);
              }}
            >
              <EditOutlined className="ifes-icon" />
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Popconfirm
              title="Tem certeza que deseja excluir esta aula?"
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

  const formatTime = (input: any) => {
    // Remove todos os caracteres que não são números
    const cleanedInput = input.replace(/\D/g, '');
  
    // Limita o tamanho da entrada para 5 caracteres
    const limitedInput = cleanedInput.slice(0, 4);
  
    // Adiciona ':' se necessário
    if (limitedInput.length > 2) {
      return limitedInput.slice(0, 2) + ':' + limitedInput.slice(2);
    } else {
      return limitedInput;
    }
  };
  
  
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
      <Table columns={columns} dataSource={aulas} loading={loading} />

      {/* Modal */}
      <Modal
        title="Adicionar Aula"
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" style={{ flex: 1 }}>
          <Form.Item
            name="data"
            label="Data"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Por favor, insira a data da aula!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item
            name="horaInicio"
            label="Hora Inicio"
            rules={[
              {
                required: true,
                message: "Por favor, insira a hora de fim da aula!",
              },
            ]}
          >
            <Input
              placeholder="HH:mm"
              onChange={(e) => {
                const { value } = e.target;
                const formattedValue = formatTime(value);
                // Define o valor formatado no campo de entrada
                e.target.value = formattedValue;
                form.setFieldValue('horaInicio', formattedValue)
              }}
            />
          </Form.Item>
          <Form.Item
            name="horaFim"
            label="Hora Fim"
            rules={[
              {
                required: true,
                message: "Por favor, insira a hora de fim da aula!",
              },
            ]}
          >
            <Input
              placeholder="HH:mm"
              onChange={(e) => {
                const { value } = e.target;
                let formattedValue = formatTime(value);
                
                // Se o valor formatado for diferente do valor original, atualize o valor no campo
                if (formattedValue !== value) {
                  form.setFieldValue('horaFim', formattedValue);
                }
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Aulas;
