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
  Select
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CardFooter } from "../../../components/CardFooter";
import { ColumnsType } from "antd/es/table";
import { get, post, put, remove } from "../../../api/axios";

interface AlunoType {
  key: React.Key;
  id: number;
  nome: string;
  matricula: string;
  curso: CursoType;
  turma: TurmaType; // Adicionando turma ao tipo AlunoType
}

interface CursoType {
  id: number;
  nome: string;
}

interface TurmaType {
  id: number;
  nome: string;
}

const Alunos: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [alunoToEdit, setAlunoToEdit] = useState<AlunoType | null>(null);
  const [cursos, setCursos] = useState<CursoType[]>([]);
  const [turmas, setTurmas] = useState<TurmaType[]>([]); // Adicionando turmas
  const [alunos, setAlunos] = useState<AlunoType[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [cursoSelecionado, setCursoSelecionado] = useState<CursoType | null>(null);
  const [turmaSelecionada, setTurmaSelecionada] = useState<TurmaType | null>(null); // Adicionando turmaSelecionada

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setAlunoToEdit(null);
    setIsOpenModal(false);
  };

  const getCursos = async () => {
    try {
      const response: CursoType[] = await get("cursos");
      setCursos(response);
    } catch (error) {
      console.error("Erro ao obter cursos:", error);
    }
  };

  const getTurmas = async () => { // Função para obter as turmas
    try {
      const response: TurmaType[] = await get("turmas");
      setTurmas(response);
    } catch (error) {
      console.error("Erro ao obter turmas:", error);
    }
  };

  const getAlunos = async () => {
    setLoading(true);
    try {
      const response: AlunoType[] = await get("alunos");
      setAlunos(response);
    } catch (error) {
      console.error("Erro ao obter alunos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAlunos();
    getCursos();
    getTurmas(); // Chamando a função para obter as turmas ao montar o componente
  }, []);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
  
      const alunoData = {
        nome: values.nome,
        matricula: values.matricula,
        curso: cursoSelecionado, // Passando o objeto cursoSelecionado
        turma: turmaSelecionada, // Passando o objeto turmaSelecionada
        id: alunoToEdit ? alunoToEdit.id : null,
      };
  
      if (!alunoToEdit) {
        const response = await post("alunos/create", alunoData);
        setAlunos([...alunos, response]);
        message.success("Aluno criado com sucesso");
      } else {
        const response = await put(
          `alunos/update/${alunoToEdit.id}`,
          alunoData
        );
        setAlunos(
          alunos.map((aluno) =>
            aluno.id === response.id ? response : aluno
          )
        );
        message.success("Aluno editado com sucesso");
      }
  
      handleCancel();
    } catch (error: any) {
      // Verificar se há uma resposta de erro e exibir a mensagem, caso contrário, exibir uma mensagem genérica
      if (error.response && error.response.data && error.response.data.message) {
        showError("Erro ao processar o formulário: " + error.response.data.message);
      }
      console.error("Erro ao processar o formulário:", error);
    }
  };
  

  const showError = (errorMessage: string) => {
    message.error(errorMessage);
  };

  const onDelete = async (id: number) => {
    try {
      await remove(`alunos/delete/${id}`);
      setAlunos(alunos.filter((aluno) => aluno.id !== id));
      message.success("Aluno excluído com sucesso");
    } catch (error: any) {
      showError("Erro ao processar o formulário: " + error.response.data.message);
      console.error("Erro ao excluir aluno:", error);
    }
  };

  const columns: ColumnsType<AlunoType> = [
    {
      title: "Nome",
      dataIndex: "nome",
    },
    {
      title: "Matrícula",
      dataIndex: "matricula",
    },
    {
      title: "Curso",
      dataIndex: "curso",
      render: (curso: CursoType | null) => curso ? curso.nome : 'N/A',
    },
    {
      title: "Turma", // Adicionando a coluna de turma
      dataIndex: "turma",
      render: (turma: TurmaType | null) => turma ? turma.nome : 'N/A',
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
    setAlunoToEdit(record);
    form.setFieldsValue({
      nome: record.nome,
      matricula: record.matricula,
      curso: record.curso.id, // Definindo o ID do curso no formulário
      turma: record.turma.id, // Definindo o ID da turma no formulário
    });
    
    // Definindo o cursoSelecionado e turmaSelecionada
    const selectedCurso = cursos.find(curso => curso.id === record.curso.id);
    if (selectedCurso) {
      setCursoSelecionado(selectedCurso);
    }

    const selectedTurma = turmas.find(turma => turma.id === record.turma.id);
    if (selectedTurma) {
      setTurmaSelecionada(selectedTurma);
    }

    setIsOpenModal(true);
  }}
>

              <EditOutlined className="ifes-icon" />
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Popconfirm
              title="Tem certeza que deseja excluir este aluno?"
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
      <Table columns={columns} dataSource={alunos} loading={loading} />

      {/* Modal */}
      <Modal
        title="Adicionar Aluno"
        visible={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nome"
            label="Nome"
            rules={[
              { required: true, message: "Por favor, insira o nome do aluno!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="matricula"
            label="Matrícula"
            rules={[
              { required: true, message: "Por favor, insira a matrícula do aluno!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="curso"
            label="Curso"
            rules={[
              { required: true, message: "Por favor, selecione o curso do aluno!" },
            ]}
          >
            <Select
              onChange={(cursoId) => {
                const curso = cursos.find(curso => curso.id === cursoId);
                if (curso) {
                  setCursoSelecionado(curso);
                }
              }}
            >
              {cursos.length > 0 &&
                cursos.map(curso => (
                  <Select.Option key={curso.id} value={curso.id}>
                    {curso.nome}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            name="turma" // Adicionando o campo de turma no formulário
            label="Turma"
            rules={[
              { required: true, message: "Por favor, selecione a turma do aluno!" },
            ]}
          >
            <Select
              onChange={(turmaId) => {
                const turma = turmas.find(turma => turma.id === turmaId);
                if (turma) {
                  setTurmaSelecionada(turma);
                }
              }}
            >
              {turmas.length > 0 &&
                turmas.map(turma => (
                  <Select.Option key={turma.id} value={turma.id}>
                    {turma.nome}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Alunos;
