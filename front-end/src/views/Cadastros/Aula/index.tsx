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
  Select,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { CardFooter } from "../../../components/CardFooter";
import { ColumnsType } from "antd/es/table";
import { get, post, put, remove } from "../../../api/axios";
import moment from "moment";

const { Option } = Select;

interface AulaType {
  key: React.Key;
  id: number;
  numeroAulas: number;
  diaSemana: string;
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
  turma: {
    id: number;
    nome: string;
  };
  alunos: {
    id: number;
    nome: string;
  }[];
  horarios: { id: number; horaInicio: string; horaFim: string }[];
}

const Aulas: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [aulaToEdit, setAulaToEdit] = useState<AulaType | null>(null);
  const [aulas, setAulas] = useState<any[]>([]);
  const [locais, setLocais] = useState<any[]>([]);
  const [professores, setProfessores] = useState<any[]>([]);
  const [periodosAcademicos, setPeriodosAcademicos] = useState<any[]>([]);
  const [disciplinas, setDisciplinas] = useState<any[]>([]);
  const [turmas, setTurmas] = useState<any[]>([]); // Adicionado estado para turmas
  const [horarios, setHorarios] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
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

  const getHorarios = async () => {
    try {
      const response = await get("horarios");
      setHorarios(response);
    } catch (error) {
      console.error("Erro ao obter horários:", error);
    }
  };

  const getTurmas = async () => {
    try {
      const response = await get("turmas"); // Adicionar endpoint correto
      setTurmas(response);
    } catch (error) {
      console.error("Erro ao obter turmas:", error);
    }
  };

  useEffect(() => {
    getAulas();
    getLocais();
    getProfessores();
    getPeriodosAcademicos();
    getDisciplinas();
    getAlunos();
    getHorarios();
    getTurmas(); // Chamar a função para obter as turmas
  }, []);
  
  const showError = (errorMessage: string) => {
    message.error(errorMessage);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      const aulaData = {
        diaSemana: values.diaSemana,
        numeroAulas: values.numeroAulas,
        local: locais.find((local) => local.id === values.localId),
        professor: professores.find(
          (professor) => professor.id === values.professorId
        ),
        periodoAcademico: periodosAcademicos.find(
          (periodo) => periodo.id === values.periodoAcademicoId
        ),
        disciplina: disciplinas.find(
          (disciplina) => disciplina.id === values.disciplinaId
        ),
        turma: turmas.find((turma) => turma.id === values.turmaId), // Passando o objeto completo da turma
        alunos: values.alunos.map((id: number) =>
          alunos.find((aluno) => aluno.id === id)
        ),
        horarios: values.horarios.map((id: number) =>
          horarios.find((horario) => horario.id === id)
        ),
      };

      console.log("Dados enviados para o backend:", aulaData); // Adicionando console.log com os dados

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
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        showError("Erro ao processar o formulário: " + error.response.data.message);
      }
      console.error("Erro ao processar o formulário:", error);
    }
  };

  const onDelete = async (id: number) => {
    try {
      await remove(`aulas/delete/${id}`);
      setAulas(aulas.filter((aula) => aula.id !== id));
      message.success("Aula excluída com sucesso");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        showError("Erro ao processar o formulário: " + error.response.data.message);
      }
      console.error("Erro ao excluir aula:", error);
    }
  };

  const viewAlunos = (alunos: any[] | null) => {
    if (!alunos || alunos.length === 0) {
      Modal.info({
        title: "Alunos da Aula",
        content: "Nenhum aluno matriculado nesta aula.",
        onOk() {},
      });
    } else {
      Modal.info({
        title: "Alunos da Aula",
        content: (
          <ul>
            {alunos.map((aluno) => (
              <li key={aluno.id}>{aluno.nome}</li>
            ))}
          </ul>
        ),
        onOk() {},
      });
    }
  };

  const renderAlunos = (alunosIds: number[] | null) => {
    if (!alunosIds || alunosIds.length === 0) {
      return "";
    } else {
      const alunosSelecionados = alunos.filter((aluno) =>
        alunosIds.includes(aluno.id)
      );
      return alunosSelecionados.map((aluno) => aluno.nome).join(", ");
    }
  };

  const columns: ColumnsType<AulaType> = [
    {
      title: "Dia da semana",
      dataIndex: "diaSemana",
      key: "diaSemana",
    },
    {
      title: "Horários",
      dataIndex: "horarios",
      key: "horarios",
      render: (horarios: any[]) => (
        <ul>
          {horarios &&
            horarios.length > 0 &&
            horarios.map((horario: any) => (
              <li key={horario.id}>
                {moment(horario.horaInicio, "HH:mm:ss").format("HH:mm")} -{" "}
                {moment(horario.horaFim, "HH:mm:ss").format("HH:mm")}
              </li>
            ))}
        </ul>
      ),
    },
    {
      title: "Número de Aulas",
      dataIndex: "numeroAulas",
      key: "numeroAulas",
    },
    {
      title: "Local",
      dataIndex: "local",
      key: "local",
      render: (local: any) => local.descricao,
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
      title: "Turma", // Adicionar coluna de turma
      dataIndex: "turma",
      key: "turma",
      render: (turma: { id: number; nome: string }) => {
        return turma ? turma.nome : "";
      },
    },
    {
      title: "Período Acadêmico",
      dataIndex: "periodoAcademico",
      key: "periodoAcademico",
      render: (periodoAcademico: {
        ano: number;
        periodo: number;
        formato: string;
      }) => {
        return periodoAcademico
          ? periodoAcademico.formato === "ANUAL"
            ? periodoAcademico.ano
            : `${periodoAcademico.ano}/${periodoAcademico.periodo}`
          : "";
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
                  diaSemana: record.diaSemana,
                  numeroAulas: record.numeroAulas,
                  localId: record.local.id,
                  professorId: record.professor.id,
                  periodoAcademicoId: record.periodoAcademico.id,
                  disciplinaId: record.disciplina.id,
                  turmaId: record.turma.id, // Adicionar campo de turma
                  alunos: record.alunos.map((aluno: any) => aluno.id),
                  horarios: record.horarios.map((horario: any) => horario.id),
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
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
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
            name="diaSemana"
            label="Dia da semana"
            rules={[
              {
                required: true,
                message: "Por favor, selecione o dia da semana!",
              },
            ]}
          >
            <Select>
              <Option value="SEGUNDA-FEIRA">Segunda-feira</Option>
              <Option value="TERÇA-FEIRA">Terça-feira</Option>
              <Option value="QUARTA-FEIRA">Quarta-feira</Option>
              <Option value="QUINTA-FEIRA">Quinta-feira</Option>
              <Option value="SEXTA-FEIRA">Sexta-feira</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="numeroAulas"
            label="Número de Aulas"
            rules={[
              {
                required: true,
                message: "Por favor, insira o número de aulas!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="horarios"
            label="Horário"
            rules={[
              {
                required: true,
                message: "Por favor, selecione o(s) horário(s)!",
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
            name="turmaId"
            label="Turma"
            rules={[
              {
                required: true,
                message: "Por favor, selecione a turma!",
              },
            ]}
          >
            <Select>
              {turmas &&
                turmas.length > 0 &&
                turmas.map((turma) => (
                  <Option key={turma.id} value={turma.id}>
                    {turma.nome}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item name="alunos" label="Alunos">
            <Select mode="multiple" placeholder="Selecione os alunos">
              {alunos &&
                alunos.length > 0 &&
                alunos.map((aluno) => (
                  <Option key={aluno.id} value={aluno.id}>
                    {aluno.nome}
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
