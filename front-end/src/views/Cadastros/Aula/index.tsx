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
import { DeleteOutlined, EditOutlined, PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
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
  disciplina: {
    id: number;
    nome: string;
  };
  alunos: {
    id: number;
    nome: string;
  }[];
}

const Aulas: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [aulaToEdit, setAulaToEdit] = useState<AulaType | null>(null);
  const [aulas, setAulas] = useState<any[]>([]);
  const [locais, setLocais] = useState<any[]>([]);
  const [professores, setProfessores] = useState<any[]>([]);
  const [periodosAcademicos, setPeriodosAcademicos] = useState<any[]>([]);
  const [disciplinas, setDisciplinas] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [alunosSelecionados, setAlunosSelecionados] = useState<any[]>([]);
  const [alunos, setAlunos] = useState<any[]>([]); 

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

  const getAlunos = async () => {
    try {
      const response = await get("alunos");
      // Armazenar a lista de alunos
      setAlunos(response);
    } catch (error) {
      console.error("Erro ao obter alunos:", error);
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

  useEffect(() => {
    getAulas();
    getLocais();
    getProfessores();
    getPeriodosAcademicos();
    getDisciplinas();
    getAlunos();
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
        disciplina: disciplinas.find(disciplina => disciplina.id === values.disciplinaId),
        alunos: alunosSelecionados.map(id => ({
          id,
          nome: alunos.find(aluno => aluno.id === id).nome
        })),
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

 const viewAlunos = (alunos: any[] | null) => {
  if (!alunos || alunos.length === 0) {
    Modal.info({
      title: "Alunos da Aula",
      content: "Nenhum aluno matriculado nesta aula.",
      onOk() {}
    });
  } else {
    Modal.info({
      title: "Alunos da Aula",
      content: (
        <ul>
          {alunos.map(aluno => (
            <li key={aluno.id}>{aluno.nome}</li>
          ))}
        </ul>
      ),
      onOk() {}
    });
  }
};

const renderAlunos = (alunosIds: number[]) => {
  const alunosSelecionados = alunos.filter(aluno => alunosIds.includes(aluno.id));
  return alunosSelecionados.map(aluno => aluno.nome).join(", ");
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
      title: "Disciplina",
      dataIndex: "disciplina",
      key: "disciplina",
      render: (disciplina: { id: number; nome: string }) => {
        return disciplina ? disciplina.nome : "";
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
      title: "Alunos",
      dataIndex: "alunos",
      key: "alunos",
      render: (alunosIds: number[]) => (
        <Tooltip title="Visualizar Alunos">
          <Button
            type="link"
            icon={<UnorderedListOutlined />}
            onClick={() => viewAlunos(alunosIds)}
          >
            {renderAlunos(alunosIds)}
          </Button>
        </Tooltip>
      ),
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
                  disciplinaId: record.disciplina.id,
                  alunos: record.alunos.map(aluno => aluno.id)
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
      <Table columns={columns} dataSource={aulas} loading={loading} />
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
              {locais && locais.length > 0 &&
                locais.map((local) => (
                  <Option key={local.id} value={local.id}>
                    {local.descricao}
                  </Option>
                ))
              }
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
              {professores && professores.length > 0 &&
                professores.map((professor) => (
                  <Option key={professor.id} value={professor.id}>
                    {professor.nome}
                  </Option>
                ))
              }
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
              {periodosAcademicos && periodosAcademicos.length > 0 &&
                periodosAcademicos.map((periodo) => (
                  <Option key={periodo.id} value={periodo.id}>
                    {periodo.formato === "ANUAL" ? periodo.ano : `${periodo.ano}/${periodo.periodo}`}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>

        <Form.Item
            name="disciplinaId"
            label="Disciplina"
            rules={[
              {
                required: true,
                message: "Por favor, selecione a disciplina!",
              },
            ]}
          >
            <Select>
              {disciplinas && disciplinas.length > 0 &&
                disciplinas.map((disciplina) => (
                  <Option key={disciplina.id} value={disciplina.id}>
                    {disciplina.nome}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>

     
          <Form.Item
            name="alunos"
            label="Alunos"
          >
            <Select
              mode="multiple"
              placeholder="Selecione os alunos"
              onChange={(selectedAlunos: any[]) => setAlunosSelecionados(selectedAlunos)}
            >
              {alunos && alunos.length > 0 &&
                alunos.map((aluno) => (
                  <Option key={aluno.id} value={aluno.id}>
                    {aluno.nome}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
};

export default Aulas;
