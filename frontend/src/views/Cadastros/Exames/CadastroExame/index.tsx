import {
  Button,
  Form,
  Input,
  Select,
  Switch,
  Tooltip,
} from "antd";

import "../styles.css";
import { CardCadastro } from "../../../../components/CardCadastro";
import {
  CloseOutlined,
  ExperimentOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

export default function ExameCadastro() {
  const [form] = Form.useForm();

  const salvarForm = async () => {
    try {
      const values = await form.validateFields();
      // Faça algo com os valores, como enviar para o servidor
    } catch (errorInfo) {}
  };

  const navigate = useNavigate();

  return (
    <>
      <h3 style={{ paddingBottom: "1rem" }}>Cadastrar Novo Exame</h3>
      <Form form={form} name="userForm" initialValues={{ remember: true }}>
        <div className="flex gap-1 usuario-container"  style={{ width: "100%" }}>
          <CardCadastro
            titulo="Exame"
            icone={<ExperimentOutlined />}
           
          >
            <Form.Item
              label="Código E-social"
              name="codigoESocial"
              rules={[
                {
                  required: true,
                  message: "Por favor, verifique os campos obrigatórios!",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Exame"
              name="Exame"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira o exame!",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Ativo"
              name="Ativo"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira o exame!",
                },
              ]}
            >
              <Switch defaultChecked />
            </Form.Item>
          </CardCadastro>
        </div>

        <div className="footer-cadastro">
          <Tooltip title="Cancelar">
            <Button className="senai-btn-warning" icon={<CloseOutlined />}>
              Cancelar
            </Button>
          </Tooltip>

          <Tooltip title="Salvar">
            <Button className="senai-btn-success" icon={<SaveOutlined />}>
              Salvar
            </Button>
          </Tooltip>
        </div>
      </Form>
    </>
  );
}
