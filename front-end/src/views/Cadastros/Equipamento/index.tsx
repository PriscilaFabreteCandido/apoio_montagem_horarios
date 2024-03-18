import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Select,
  Space,
  Switch,
  Table,
  Tooltip,
  Typography,
  Modal,
  Form,
  message,
  Popconfirm,
} from "antd";
import { DeleteOutlined, EditOutlined, InfoOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

import { CardFooter } from "../../../components/CardFooter";
import { ColumnsType } from "antd/es/table";
import { get, post, put, remove } from "../../../api/axios";

interface DataType {
  key: React.Key;
  descricao: string;
}

const Equipamentos: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [entityToEdit, setEntityToEdit] = useState<any>();
  const [equipamentos, setEquipamentos] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>();

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = async ()=> {
    // Limpar o formulário
    await form.resetFields();
    setEntityToEdit(null);
    resetFields(null)
    setIsOpenModal(false);
  };

  const resetFields = (entity: any) => {
    form.setFieldValue("descricao", entity ? entity.descricao : "");
  };



  const getEquipamentos = async () => {
    try {
      const response: any[] = await get("equipamentos");
      if (Array.isArray(response)) { // Verifica se response é uma array
        setEquipamentos(response);
      } else {
        setEquipamentos([]); // Caso não seja uma array, inicializa como vazia
      }
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getEquipamentos();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();

      let values = {
        descricao: form.getFieldValue("descricao"),
        id: entityToEdit ? entityToEdit.id : null,
      };

      if (!entityToEdit) {
        const response = await post("equipamentos/create", values);
        setEquipamentos(equipamentos.concat(response));
        message.success("Equipamento criado com sucesso");
      } else {
        const response = await put(
          `equipamentos/update/${entityToEdit.id}`,
          values
        );
        let newEquipamentos = [...equipamentos];
        let i = equipamentos.findIndex((x) => x.id == entityToEdit.id);
        newEquipamentos[i] = response;
        setEquipamentos(newEquipamentos);
        message.success("Equipamento editado com sucesso");
      }
      

      handleCancel()
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
      // Aqui você pode adicionar lógica para lidar com o erro, se necessário
    }
  };

  const onDelete = async (id: number) => {
    try {
      await remove(`equipamentos/delete/${id}`);
      message.success("Equiapamento excluído com sucesso!");
      setEquipamentos(equipamentos.filter(x => x.id != id));
    }
    catch (error) {

    }
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Nome",
      dataIndex: "descricao",
      sorter: (a: any, b: any) => a.descricao.length - b.descricao.length,
      sortDirections: ["descend"],
    },
    {
      title: "Ações",
      key: "acao",
      render: (acao, record: any) => (
        <Space size="middle">
          <Tooltip title="Editar">
            <Button
              className="ifes-btn-warning"
              shape="circle"
              onClick={() => {
                setEntityToEdit(record);
                resetFields(record);
                setIsOpenModal(true);
              }}
            >
              <EditOutlined className="ifes-icon" />
            </Button>
          </Tooltip>
          
          <Tooltip title="Excluir">
            <Popconfirm
              title="Excluir"
              description="Tem certeza que deseja excluir este equipamento?"
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
      ),
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <CardFooter>
        <div className="flex justify-content-between">
          {/* Filtros */}
          <div className="flex filtros-card"></div>

          <div>
            <Button className="ifes-btn-success" onClick={showModal}>
              <PlusOutlined className="ifes-icon" />
              Adicionar
            </Button>
          </div>
        </div>
      </CardFooter>

      {/* Tabela */}
      <Table columns={columns} dataSource={equipamentos} loading={loading} />

      {/* Modal */}
      <Modal
        title="Adicionar Equipamento"
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
        </Form>
      </Modal>
    </>
  );
};

export default Equipamentos;
