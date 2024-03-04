import { Button, Form, Input, Modal, Select, Table, Tooltip } from "antd";
import React, { useState } from "react";
import { CardCadastro } from "../../../../components/CardCadastro";
import {
  AreaChartOutlined,
  BookOutlined,
  CloseOutlined,
  PlusOutlined,
  SaveOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import "../../styles.css";
import columnsRiscos from "./columnsRiscos";
import columnsExames from "./columnsExames";

export default function CadastroItemPCMSO() {
  const [form] = Form.useForm();
  const [formExames] = Form.useForm();
  const [riscos, setRiscos] = useState<any>([
    {
      classeDeRisco: "Físico",
      perigoFatorDeRisco: "Ruído",
      codigoESocial: "02.14.011",
      exposicao: "Habitual",
      cor: "green",
    },
    {
      classeDeRisco: "Químico",
      perigoFatorDeRisco: "Poeira e/ou fibra mineal",
      codigoESocial: "00.00.00",
      exposicao: "Habitual E Intermitente",
      cor: "red",
    },
    {
      classeDeRisco: "Associação de Fatores de Riscos",
      perigoFatorDeRisco: "Ruído",
      codigoESocial: "04.01.002",
      exposicao: "Intermitente",
      cor: "black",
    },
  ]);

  const [exames, setExames] = useState<any>([
    {
      nomeExame: "Admissional",
      codigoESocial: "0.1",
      periodo: "Anual",
      tipoExame: "Admissional",
    },
    {
      nomeExame: "Demissional",
      codigoESocial: "0.1",
      periodo: "Anual",
      tipoExame: "Demissional",
    },
  ]);
  const [openModalRiscos, setOpenModalRiscos] = useState(false);

  const handleExamesChange = (value: any) => {
    // Adjust the list of available options for Exame Period based on selected Exame Types
    const newExamePeriodOptions: any = value.includes("Mudança de Risco")
      ? ["Não se aplica", "Anual", "Bienal", "Semestral"]
      : ["Não se aplica", "Anual", "Bienal"];

    //setExamePeriodOptions(newExamePeriodOptions);
  };

  const onFinish = (values: any) => {};

  const showModalRiscos = () => {
    setOpenModalRiscos(true);
  };

  return (
    <>
      <div className="newItemContainer">
        <h3>Cadastrar Novo Item ao PCMSO</h3>
      </div>

      <Modal
        visible={openModalRiscos}
        title="Adicionar Exame"
        onCancel={() => setOpenModalRiscos(false)}
      >
        <Form form={formExames} onFinish={onFinish}>
          <Form.Item required label="Tipos de Exames" name="tiposDeExames">
            <Select style={{ width: "100%" }}>
              <Select.Option value="Admissional">Admissional</Select.Option>
              <Select.Option value="Periódico">Periódico</Select.Option>
              <Select.Option value="Demissional">Demissional</Select.Option>
              <Select.Option value="Mudança de Risco">
                Mudança de Risco
              </Select.Option>
              <Select.Option value="Retorno ao Trabalho">
                Retorno ao Trabalho
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item required label="Exame" name="exame">
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item required label="Código E-Social" name="codigoESocial">
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item required label="Período" name="periodo">
            <Select style={{ width: "100%" }}>
              <Select.Option value="Não se aplica">Não se aplica</Select.Option>
              <Select.Option value="Anual">Anual</Select.Option>
              <Select.Option value="Bienal">Bienal</Select.Option>
              <Select.Option value="Semestral">Semestral</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{ tiposDeExames: [] }}
      >
        <div className="flex gap-1">
          <div style={{ width: "30%" }}>
            <CardCadastro
              style={{ height: "calc(100% - 1rem)" }}
              titulo="PGR"
              icone={<AreaChartOutlined />}
            >
              <Form.Item required label="GHE" name="descricao">
                <Select></Select>
              </Form.Item>

              <Form.Item required label="Função" name="descricao">
                <Select></Select>
              </Form.Item>

              <Form.Item name="observacoes" label="Observações">
                <Input.TextArea placeholder="Observações" />
              </Form.Item>
            </CardCadastro>
          </div>

          <div style={{ width: "70%" }}>
            <CardCadastro titulo="Riscos" icone={<WarningOutlined />}>
              <Table
                pagination={false}
                dataSource={riscos}
                columns={columnsRiscos}
              />
            </CardCadastro>
          </div>
        </div>

        <div className="flex gap-1">
          <CardCadastro titulo="Exames" icone={<BookOutlined />}>
            <div className="container-exames">
              <div></div>
              <div>
                <Button
                  className="senai-btn-info"
                  onClick={() => {
                    showModalRiscos();
                  }}
                >
                  <PlusOutlined className="senai-icon" />
                  Adicionar
                </Button>
              </div>
            </div>
            <Table dataSource={exames} columns={columnsExames} />;
          </CardCadastro>
        </div>
      </Form>

      <div className="footer-cadastro">
        <Tooltip title="Cancelar">
          <Button
            className="senai-btn-warning"
            icon={<CloseOutlined className="icon-senai" />}
          >
            Cancelar
          </Button>
        </Tooltip>

        <Tooltip title="Salvar">
          <Button
            className="senai-btn-success"
            icon={<SaveOutlined className="senai-icon" />}
          >
            Salvar
          </Button>
        </Tooltip>
      </div>
    </>
  );
}
