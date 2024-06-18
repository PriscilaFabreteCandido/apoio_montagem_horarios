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
import { CardFooter } from "../../components/CardFooter";
import { ColumnsType } from "antd/es/table";
import { get, post, put, remove } from "../../api/axios";

interface Users {
  login: string;
  role: string;
}

const Users: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<Users | null>(null);
  const [users, setUsers] = useState<Users[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setUserToEdit(null);
    setIsOpenModal(false);
  };

  const getUsers = async () => {
    setLoading(true);
    try {
      const response: Users[] = await get("auth/users");
      setUsers(response);
    } catch (error) {
      message.error("Erro ao obter usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      const userData = {
        login: values.login,
        password: values.password,
        role: "ADMIN",
      };

      const response = await post("auth/register", userData);
      setUsers([...users, response]);
      message.success("Usuário cadastrado com sucesso");
      window.location.reload()
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

  const columns: ColumnsType<Users> = [
    {
      title: "Usuário",
      dataIndex: "login",
    },
    {
      title: "Role",
      dataIndex: "role",
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
      <Table columns={columns} dataSource={users} loading={loading} />

      {/* Modal */}
      <Modal
        title="Cadastrar usuário"
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="login"
            label="Usuário"
            rules={[
              { required: true, message: "Por favor, insira um usuário válido!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Senha de acesso"
            rules={[
              { required: true, message: "Por favor, insira uma senha válida!" },
            ]}
          >
            <Input type="password" />
          </Form.Item>
         
        </Form>
      </Modal>
    </>
  );
};

export default Users;
