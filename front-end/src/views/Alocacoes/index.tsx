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
  Space
} from "antd";
import { DeleteOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [locais, setLocais] = useState<any[]>([]);
  const [disciplinas, setDisciplinas] = useState<any[]>([]);
  const [professores, setProfessores] = useState<any[]>([]);
  const [periodosAcademicos, setPeriodosAcademicos] = useState<any[]>([]);
  const [horarios, setHorarios] = useState<any[]>([]);

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

  const getLocais = async () => {
    try {
      const response = await get("locais");
      setLocais(response);
    } catch (error) {
      console.error("Erro ao obter locais:", error);
    }
  };

  const getDisciplinas = async () => {
    try {
      const response = await get("disciplinas");
      setDisciplinas(response);
    } catch (error) {
      console.error("Erro ao obter disciplinas:", error);
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

  const getPeriodos = async () => {
    try {
      const response = await get("periodos");
      setPeriodosAcademicos(response);
    } catch (error) {
      console.error("Erro ao obter períodos:", error);
    }
  };

  const getHorarios = async () => {
    try {
      const response = await get("horarios");
      setHorarios(response);
    } catch (error) {
      console.error("Erro ao obter horários:", error);
    }
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
    getDisciplinas();
    getProfessores();
    getPeriodos();
    getHorarios();
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      let data = {
        descricao: values.descricao,
        data: values.data,
        horaInicio: values.horaInicio,
        horaFim: values.horaFim,
        local: locais.find((local) => local.id === values.localId),
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

      // Reload the page to update the table correctly
      window.location.reload();
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };

  const handleOkAlocarSala = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      let data = {
        local: locais.find((local) => local.id === values.local),
        disciplina: disciplinas.find((disciplina) => disciplina.id === values.disciplina),
        professor: professores.find((professor) => professor.id === values.professor),
        periodo: periodosAcademicos.find((periodo) => periodo.id === values.periodo),
        dia: values.dia,
        horarios: values.horarios.map((horarioId: number) => horarios.find((horario) => horario.id === horarioId)),
        id: entityToEdit ? entityToEdit.id : null
      };

      let response;
      if (!entityToEdit) {
        response = await post("alocacoes/create", data);
        message.success("Sala alocada com sucesso");
      } else {
        response = await put(`alocacoes/update/${entityToEdit.id}`, data);
        message.success("Alocação editada com sucesso");
      }

      // Reload the page to update the table correctly
      window.location.reload();
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
      render: (local: any) => local.descricao,
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
                    localId: record.local.id, // Certifique-se de que está pegando o id do local
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
                  onClick={() => { }}
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
            <Button style={{ marginRight: '1rem' }} type="primary" className="ifes-btn-help" onClick={showModal} icon={<PlusOutlined />}>
              Alocar Eventos
            </Button>

            {/* <Button type="primary" onClick={showModalAlocarSala} icon={<PlusOutlined />}>
              Alocar Salas
            </Button> */}
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
            label="Descrição"
            rules={[{ required: true, message: "Por favor, insira a descrição!" }]}
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

      {/* Modal para alocar sala */}
      <Modal
        title="Alocar Sala"
        visible={isOpenModalAlocarSala}
        onOk={handleOkAlocarSala}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="local"
            label="Local"
            rules={[{ required: true, message: "Por favor, selecione o local!" }]}
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
            name="disciplina"
            label="Disciplina"
            rules={[{ required: true, message: "Por favor, insira a disciplina!" }]}
          >
            <Select>
              {disciplinas &&
                disciplinas.length > 0 &&
                disciplinas.map((disciplina) => (
                  <Option key={disciplina.id} value={disciplina.id}>
                    {disciplina.nome}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="professor"
            label="Professor"
            rules={[{ required: true, message: "Por favor, insira o professor!" }]}
          >
            <Select>
              {professores &&
                professores.length > 0 &&
                professores.map((professor) => (
                  <Option key={professor.id} value={professor.id}>
                    {professor.nome}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="periodo"
            label="Período"
            rules={[{ required: true, message: "Por favor, selecione o período!" }]}
          >
            <Select>
              {periodosAcademicos &&
                periodosAcademicos.length > 0 &&
                periodosAcademicos.map((periodo) => (
                  <Option key={periodo.id} value={periodo.id}>
                    {periodo.formato === "ANUAL"
                      ? periodo.ano
                      : `${periodo.ano}/${periodo.periodo}`}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="dia"
            label="Dia"
            rules={[{ required: true, message: "Por favor, selecione o dia!" }]}
          >
            <Select>
              {["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"].map((dia, index) => (
                <Option key={index} value={dia}>
                  {dia}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="horarios"
            label="Horários"
            rules={[
              {
                required: true,
                message: "Por favor, selecione os horários!",
              },
            ]}
          >
            <Select mode="multiple" placeholder="Selecione os horários">
              {horarios &&
                horarios.length > 0 &&
                horarios.map((horario) => (
                  <Option key={horario.id} value={horario.id}>
                    {moment(horario.horaInicio, "HH:mm:ss").format("HH:mm")} -{" "}
                    {moment(horario.horaFim, "HH:mm:ss").format("HH:mm")}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Alocacoes;
