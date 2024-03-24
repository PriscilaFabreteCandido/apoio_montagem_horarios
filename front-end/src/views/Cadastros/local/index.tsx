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
  InputNumber,
  Space
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CardFooter } from "../../../components/CardFooter";
import { ColumnsType } from "antd/es/table";
import { get, post, put, remove } from "../../../api/axios";

const { Option } = Select;

interface DataType {
  key: React.Key;
  id: number;
  descricao: string;
  capacidade: number;
  equipamentos: { equipamento: EquipamentoType; quantidade: number }[];
}

interface EquipamentoType {
  id: number;
  descricao: string;
}

const Locais: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [entityToEdit, setEntityToEdit] = useState<DataType | null>(null);
  const [locais, setLocais] = useState<DataType[]>([]);
  const [equipamentos, setEquipamentos] = useState<EquipamentoType[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setEntityToEdit(null);
    setIsOpenModal(false);
  };

  const getLocais = async () => {
    try {
      setLoading(true);
      const response: DataType[] = await get("locais");
      setLocais(response);
    } catch (error) {
      console.error("Erro ao obter locais:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEquipamentos = async () => {
    try {
      const response: EquipamentoType[] = await get("equipamentos");
      setEquipamentos(response);
    } catch (error) {
      console.error("Erro ao obter equipamentos:", error);
    }
  };

  useEffect(() => {
    getLocais();
    getEquipamentos();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
  
      const data = {
        descricao: values.descricao,
        capacidade: values.capacidade,
        equipamentos: values.equipamentos
          ? values.equipamentos.map((equip: any) => ({
              equipamento: { id: equip.id },
              quantidade: equip.quantidade,
            }))
          : [], // Fornecer um array vazio se values.equipamentos for undefined
        id: entityToEdit ? entityToEdit.id : null,
      };
  
      if (!entityToEdit) {
        const response = await post("locais/create", data);
        setLocais([...locais, response]);
        message.success("Local criado com sucesso");
      } else {
        const response = await put(`locais/update/${entityToEdit.id}`, data);
        setLocais(
          locais.map((local) => (local.id === response.id ? response : local))
        );
        message.success("Local editado com sucesso");
      }
  
      handleCancel();
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };
  

  const onDelete = async (id: number) => {
    try {
      await remove(`locais/delete/${id}`);
      setLocais(locais.filter((local) => local.id !== id));
      message.success("Local excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir local:", error);
    }
  };

  const onEdit = (record: DataType) => {
    setEntityToEdit(record);
    form.setFieldsValue({
      descricao: record.descricao,
      capacidade: record.capacidade,
      equipamentos: record.equipamentos.map((equipamento) => ({
        id: equipamento.equipamento.id,
        quantidade: equipamento.quantidade,
      })),
    });
    showModal();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Nome",
      dataIndex: "descricao",
      sorter: (a: DataType, b: DataType) =>
        a.descricao.localeCompare(b.descricao),
    },
    {
      title: "Capacidade",
      dataIndex: "capacidade",
    },
    {
      title: "Equipamentos",
      dataIndex: "equipamentos",
      render: (equipamentos: {
        equipamento: EquipamentoType;
        quantidade: number;
      }[]) => {
        return (
          <ul>
            {equipamentos.map((equipamento) => (
              <li key={equipamento.equipamento.id}>
                {`${equipamento.equipamento.descricao} (${equipamento.quantidade})`}
              </li>
            ))}
          </ul>
        );
      },
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <>

          <Space size="middle">
          <Tooltip title="Editar">
            <Button
              className="ifes-btn-warning"
              shape="circle"
              onClick={() => onEdit(record)}
            >
              <EditOutlined className="ifes-icon" />
            </Button>
          </Tooltip>

          <Tooltip title="Excluir">
            <Popconfirm
              title="Excluir"
              description="Tem certeza que deseja excluir este equipamento?"
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
        </>
      ),
    },
  ];

  return (
    <>
      {/* Header */}
      <CardFooter>
        <div className="flex justify-content-between">
          <div className="flex filtros-card"></div>

          <div>
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
              Adicionar
            </Button>
          </div>
        </div>
      </CardFooter>

      {/* Tabela */}
      <Table columns={columns} dataSource={locais} loading={loading} />

      {/* Modal */}
      <Modal
        title="Adicionar Local"
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
            name="capacidade"
            label="Capacidade"
            rules={[
              { required: true, message: "Por favor, insira a capacidade!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.List name="equipamentos">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <div key={field.key}>
                    <Form.Item
                      name={[field.name, "id"]}
                      fieldKey={[field.fieldKey ?? "", "id"]}
                      rules={[
                        {
                          required: true,
                          message: "Por favor, selecione um equipamento!",
                        },
                      ]}
                    >
                      <Select placeholder="Selecione um equipamento">
                        {equipamentos.length > 0 &&
                          equipamentos.map((equipamento) => (
                            <Option key={equipamento.id} value={equipamento.id}>
                              {equipamento.descricao}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "quantidade"]}
                      fieldKey={[field.fieldKey ?? "", "quantidade"]}
                      rules={[
                        {
                          required: true,
                          message: "Por favor, insira a quantidade!",
                        },
                      ]}
                    >
                      <InputNumber min={1} />
                    </Form.Item>
                    <Button
                      type="link"
                      onClick={() => remove(field.name)}
                      danger
                    >
                      Remover
                    </Button>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Adicionar Equipamento
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};

export default Locais;
