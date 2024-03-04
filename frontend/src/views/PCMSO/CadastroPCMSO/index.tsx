import React, { useCallback, useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Modal,
  Space,
  Table,
  Tooltip,
  Row,
  Col,
  message,
} from "antd";
import "../../PCMSO/./styles.css";
import TextArea from "antd/es/input/TextArea";
import {
  CloseOutlined,
  DeleteOutlined,
  FileOutlined,
  InboxOutlined,
  MedicineBoxOutlined,
  PlusOutlined,
  SafetyCertificateOutlined,
  SaveOutlined,
  SettingOutlined,
  UploadOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { CardCadastro } from "../../../components/CardCadastro";
import { useLocation, useNavigate } from "react-router";
import estadosBrasil from "./estadosBrasil";
import { axiosPrivate } from "../../../api/axios";
import Dragger from "antd/es/upload/Dragger";

const { Option } = Select;

const onFinish = (values: any) => {
  // Lógica para lidar com os dados do formulário quando enviado
};

const onFinishFailed = (errorInfo: any) => {};

const columns: ColumnsType<any> = [
  {
    title: "Nome do Arquivo",
    dataIndex: "descricao",
    key: "descricao",
  },
  {
    title: "Título",
    dataIndex: "titulo",
    key: "titulo",
  },
  {
    title: "Criado Por",
    dataIndex: "criadoPor",
    key: "titulo",
  },
  {
    title: "Criado Em",
    dataIndex: "criadoEm",
    key: "titulo",
  },
  {
    title: "Observações",
    dataIndex: "observacoes",
    key: "observacoes",
  },
  {
    title: "Ações",
    key: "acao",
    render: () => (
      <Space size="middle">
        <Tooltip title="Excluir">
          <Button
            className="senai-btn-danger"
            shape="circle"
            onClick={() => {}}
          >
            <DeleteOutlined className="senai-icon" />
          </Button>
        </Tooltip>

        <Tooltip title="Baixar">
          <Button
            className="senai-btn-secondary"
            shape="circle"
            onClick={() => {}}
          >
            <VerticalAlignBottomOutlined className="senai-icon" />
          </Button>
        </Tooltip>
      </Space>
    ),
  },
];

export default function CadastroPCMSO() {
  const [isOpenModalDossie, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [formDossie] = Form.useForm();
  const [dossies, setDossies] = useState<any[]>([]);
  const [selectedFileName, setSelectedFileName] = useState<any>();

  const navigate = useNavigate();
  const location = useLocation() as any;
  const { state } = location;

  const get = useCallback(
    async (id: any) => {
      try {
        const response = await axiosPrivate.get("/psmso", {
          params: { id: 1 },
        });
        // Process response or set state if needed
      } catch (error) {
        // Handle error
      }
    },
    [axiosPrivate]
  );

  const update = useCallback(
    async (pcmso: any) => {
      try {
        const response = await axiosPrivate.get("/psmso/update", {
          params: { pcmso: pcmso },
        });

        message.open({
          type: "success",
          content: "This is a success message",
        });

        return response.data;
      } catch (error) {}
    },
    [axiosPrivate]
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const salvarDossie = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //obter pgr pelo usuário

  //cancelar o cadastro ou a edição do pcmso
  function onCancelPCMSO() {
    Modal.confirm({
      title: "Cancelar",
      content: "Tem certeza de que deseja cancelar a edição ou criação?",
      onOk() {
        navigate("/PCMSO");
      }, //navegar para listagem do pcmso
      onCancel() {},
    });
  }

  useEffect(() => {
    if (state) {
      get(state.pcmso.id).then((resp) => {});
    }
  }, [state]);

  const salvarPCMSO = useCallback(() => {}, []);

  return (
    <>
      <div
        style={{
          paddingBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3>Cadastrar Novo PCMSO</h3>

        <Button
          style={{ marginRight: "0.5rem" }}
          className="senai-btn-info"
          onClick={() => {
            navigate("/PCMSO/Cadastrar/Adicionar itens ao PCMSO");
          }}
        >
          <PlusOutlined className="senai-icon" /> Adicionar Itens do PCMSO
        </Button>
      </div>

      <Modal
        title="Cadastrar Dossiê Eletrônico"
        open={isOpenModalDossie}
        onOk={salvarDossie}
        onCancel={handleCancel}
      >
        <div className="p1">
          <Form
            name="dossieEletronico"
            form={formDossie}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ width: "100%" }}
          >
            <Form.Item required label="Nome do Arquivo" name="descricao">
              <Input style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item required label="Título" name="tituloDossie">
              <Select>
                <Option value="PCMSO">PCMSO</Option>
                <Option value="CRM">CRM</Option>
                <Option value="Outros">Outros Documentos</Option>
              </Select>
            </Form.Item>
            <Form.Item required label="Data Emissão" name="dataEmissaoDossie">
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item required label="Data Validade" name="dataValidadeDossie">
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Observações" name="observacoesDossie">
              <TextArea />
            </Form.Item>

            <Form.Item required label="Selecionar um arquivo" name="file">
              <Dragger
                name="file"
                multiple={false}
                beforeUpload={() => false} // Desativa o upload automático
                showUploadList={false} // Oculta a lista de upload padrão
                onChange={() => {}} // Manipulador de eventos para alterações no arquivo
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Clique ou arraste o arquivo para esta área para fazer upload
                </p>
              </Dragger>
            </Form.Item>

            {selectedFileName && <p>Arquivo Selecionado: {selectedFileName}</p>}
          </Form>
        </div>
      </Modal>

      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{ tiposDeExames: [] }}
      >
        <div className="flex gap-1">
          <CardCadastro titulo="Gerais" icone={<SettingOutlined />}>
            <Form.Item
              label="Contrato"
              name="contrato"
              rules={[
                {
                  required: true,
                  message: "Please input the contract number!",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Data Início Contrato"
              name="dataInicioContrato"
              rules={[
                {
                  required: true,
                  message: "Please select the contract start date!",
                },
              ]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                disabled
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              label="Disposições Gerais"
              name="disposicoesGerais"
              rules={[
                {
                  required: true,
                  message: "Please input the general provisions!",
                },
              ]}
            >
              <TextArea />
            </Form.Item>
          </CardCadastro>

          <CardCadastro titulo="PGR" icone={<SafetyCertificateOutlined />}>
            <Form.Item
              required
              label="Total Funcionários"
              name="totalFuncionarios"
            >
              <Input type="number" disabled />
            </Form.Item>

            <Form.Item required label="Data Emissão" name="dataEmissao">
              <DatePicker
                format="DD/MM/YYYY"
                disabled
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item required label="Data Validade" name="dataValidade">
              <DatePicker
                format="DD/MM/YYYY"
                disabled
                style={{ width: "100%" }}
              />
            </Form.Item>
          </CardCadastro>

          <CardCadastro
            titulo="Médico Responsável / Coordenador"
            icone={<MedicineBoxOutlined />}
          >
            <Form.Item required label="Nome" name="nomeMedico">
              <Input />
            </Form.Item>

            <Form.Item
              required
              label="Especialidade"
              name="especialidadeMedico"
            >
              <Input />
            </Form.Item>

            <Row gutter={16}>
              <Col span={14}>
                <Form.Item required label="UF" name="ufMedico">
                  <Select
                    showSearch
                    filterOption={(input: any, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {estadosBrasil.map((estado) => (
                      <Option key={estado.sigla} value={estado.sigla}>
                        {estado.nome}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={10}>
                <Form.Item required label="CRM" name="crmMedico">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Telefone" name="telefoneMedico">
              <Input />
            </Form.Item>

            <Form.Item label="Endereço" name="enderecoMedico">
              <Input />
            </Form.Item>
          </CardCadastro>
        </div>

        <CardCadastro titulo="Dossiê Eletrônico" icone={<FileOutlined />}>
          <div className="container-dossie">
            <div></div>
            <div>
              <Button
                className="senai-btn-info"
                onClick={() => {
                  showModal();
                }}
              >
                <UploadOutlined />
                Anexar arquivo
              </Button>
            </div>
          </div>

          <Table columns={columns} dataSource={dossies} />
        </CardCadastro>
      </Form>

      <div className="footer-cadastro">
        <Tooltip title="Cancelar">
          <Button
            className="senai-btn-warning"
            onClick={() => {
              onCancelPCMSO();
            }}
            icon={<CloseOutlined className="senai-icon" />}
          >
            Cancelar
          </Button>
        </Tooltip>

        <Tooltip title="Salvar">
          <Button
            className="senai-btn-success"
            onClick={() => salvarPCMSO()}
            icon={<SaveOutlined className="senai-icon" />}
          >
            Salvar
          </Button>
        </Tooltip>
      </div>
    </>
  );
}
