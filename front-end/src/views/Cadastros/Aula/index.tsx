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
  Select
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CardFooter } from "../../../components/CardFooter";
import { ColumnsType } from "antd/es/table";
import { get, post, put, remove } from "../../../api/axios";
import moment from "moment";

const { Option } = Select;

interface AulaType {
  key: React.Key;
  id: number;
  data: string;
  horaInicio: string;
  horaFim: string;
  local: {
    id: number;
    descricao: string;
  };
  professor: {
    id: number;
    nome: string;
  };
  periodoAcademico: {
    id: number;
    ano: number;
    periodo: number;
    formato: string;
  };
}


const Aulas: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [aulaToEdit, setAulaToEdit] = useState<AulaType | null>(null);
  const [aulas, setAulas] = useState<any[]>([]);
  const [locais, setLocais] = useState<any[]>([]); // Estado para armazenar os locais
  const [professores, setProfessores] = useState<any[]>([]); // Estado para armazenar os professores
  const [periodosAcademicos, setPeriodosAcademicos] = useState<any[]>([]); // Estado para armazenar os períodos acadêmicos
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
      const response = await get("aulas");
      setAulas(response);
    } catch (error) {
      console.error("Erro ao obter aulas:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLocais = async () => {
    try {
      const response = await get("locais");
      setLocais(response);
    } catch (error) {
      console.error("Erro ao obter locais:", error);
    }
  };

  const getProfessores = async () => {
    try {
      const response = await get("professores");
      setProfessores(response);
    } catch (error) {
      console.error("Erro ao obter professores:", error);
    }
  };

  const getPeriodosAcademicos = async () => {
    try {
      const response = await get("periodos");
      setPeriodosAcademicos(response);
    } catch (error) {
      console.error("Erro ao obter períodos acadêmicos:", error);
    }
  };

  useEffect(() => {
    getAulas();
    getLocais();
    getProfessores();
    getPeriodosAcademicos();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      const aulaData = {
        data: moment(values.data).format("YYYY-MM-DD"),
        horaInicio: moment(values.horaInicio, "HH:mm").format("HH:mm:ss"),
        horaFim: moment(values.horaFim, "HH:mm").format("HH:mm:ss"),
        local: locais.find(local => local.id === values.localId),
        professor: professores.find(professor => professor.id === values.professorId),
        periodoAcademico: periodosAcademicos.find(periodo => periodo.id === values.periodoAcademicoId),
        id: aulaToEdit ? aulaToEdit.id : null,
      };
      
      
      

      if (!aulaToEdit) {
        const response = await post("aulas/create", aulaData);
        setAulas([...aulas, response]);
        message.success("Aula criada com sucesso");
      } else {
        const response = await put(`aulas/update/${aulaToEdit.id}`, aulaData);
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
      await remove(`aulas/delete/${id}`);
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
      title: "Local",
      dataIndex: "local",
      key: "local",
      render: (local: { id: number; descricao: string }) => {
        return local ? local.descricao : "";
      },
    },
    {
      title: "Professor",
      dataIndex: "professor",
      key: "professor",
      render: (professor: { id: number; nome: string }) => {
        return professor ? professor.nome : "";
      },
    },
    {
      title: "Período Acadêmico",
      dataIndex: "periodoAcademico",
      key: "periodoAcademico",
      render: (periodoAcademico: { ano: number; periodo: number; formato: string}) => {
        return periodoAcademico ? 
          periodoAcademico.formato === "ANUAL" ? 
            periodoAcademico.ano : 
            `${periodoAcademico.ano}/${periodoAcademico.periodo}` : 
          "";
      },
    },
    
    
    {
      title: "Ações",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Editar">
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => {
            setAulaToEdit(record);
            form.setFieldsValue({
              data: moment(record.data).format("YYYY-MM-DD"),
              horaInicio: moment(record.horaInicio, "HH:mm").format("HH:mm"),
              horaFim: moment(record.horaFim, "HH:mm").format("HH:mm"),
              localId: record.local.id,
              professorId: record.professor.id,
              periodoAcademicoId: record.periodoAcademico.id,
            });
            showModal();
          }}
        />
      </Tooltip>

          <Tooltip title="Excluir">
            <Popconfirm
              title="Tem certeza de que deseja excluir esta aula?"
              onConfirm={() => onDelete(record.id)}
              okText="Sim"
              cancelText="Cancelar"
            >
              <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
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
        <Form form={form} layout="vertical">
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
              {locais.map((local) => (
                <Option key={local.id} value={local.id}>
                  {local.descricao}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="professorId"
            label="Professor"
            rules={[
              {
                required: true,
                message: "Por favor, selecione o professor!",
              },
            ]}
          >
            <Select>
              {professores.map((professor) => (
                <Option key={professor.id} value={professor.id}>
                  {professor.nome}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
  name="periodoAcademicoId"
  label="Período Acadêmico"
  rules={[
    {
      required: true,
      message: "Por favor, selecione o período acadêmico!",
    },
  ]}
>
  <Select>
    {periodosAcademicos.map((periodo) => (
      <Option key={periodo.id} value={periodo.id}>
        {periodo.formato === "ANUAL"
          ? periodo.ano
          : `${periodo.ano}/${periodo.periodo}`}
      </Option>
    ))}
  </Select>
</Form.Item>

        </Form>
      </Modal>
    </>
  );
};

export default Aulas;
