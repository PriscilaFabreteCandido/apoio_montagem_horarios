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
import { get, post, put, remove } from "../../../api/axios";
import { ColumnsType } from "antd/es/table";
import { CardFooter } from "../../../components/CardFooter";
import moment from "moment";

interface DataType {
  key: React.Key;
  id: number;
  horaInicio: string;
  horaFim: string;
}

const HorarioAula: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [entityToEdit, setEntityToEdit] = useState<any>();
  const [horarios, setHorarios] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>();

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = async () => {
    await form.resetFields();
    setEntityToEdit(null);
    setIsOpenModal(false);
  };

  const getHorarios = async () => {
    try {
      setLoading(true);
      const response: any[] = await get("horarios");
      // Ordenar os dados por hora de início
      response.sort((a, b) => {
        return moment(a.horaInicio, 'HH:mm').diff(moment(b.horaInicio, 'HH:mm'));
      });
      setHorarios(response);
    } catch (error) {
      console.error("Erro ao obter horários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHorarios();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
  
      let data = {
        horaInicio: values.horaInicio,
        horaFim: values.horaFim,
        id: entityToEdit ? entityToEdit.id : null
      };
  
      let response: DataType; // Especificando o tipo de response
      if (!entityToEdit) {
        response = await post("horarios/create", data);
        message.success("Horário de aula criado com sucesso");
      } else {
        response = await put(`horarios/update/${entityToEdit.id}`, data);
        message.success("Horário de aula editado com sucesso");
      }
  
      // Substituindo o registro antigo pelo atualizado na lista
      const updatedHorarios = horarios.map((horario) =>
        horario.id === response.id ? response : horario
      );
  
      setHorarios(updatedHorarios);
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
      await remove(`horarios/delete/${id}`);
      setHorarios(horarios.filter((horario) => horario.id !== id));
      message.success("Horário de aula excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir horário de aula:", error);
    }
  };

  const columns: ColumnsType<DataType> = [
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
                    horaInicio: moment(record.horaInicio, "HH:mm").format("HH:mm"),
                    horaFim: moment(record.horaFim, "HH:mm").format("HH:mm")
                  });
                  setIsOpenModal(true);
                }}
              >
                <EditOutlined className="ifes-icon" />
              </Button>
            </Tooltip>
            <Tooltip title="Excluir">
              <Popconfirm
                title="Tem certeza que deseja excluir este horário de aula?"
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

          <div>
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
              Adicionar
            </Button>
          </div>
        </div>
      </CardFooter>
      
      {/* Tabela */}
      <Table columns={columns} dataSource={horarios} loading={loading} />

      {/* Modal */}
      <Modal
        title="Horário de Aula"
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
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

export default HorarioAula;
