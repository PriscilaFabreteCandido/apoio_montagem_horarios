import { DeleteOutlined, EditOutlined, InfoOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { Can } from "@casl/react";
import { Button, Space, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { FeatureCodeAction, FeatureCodeEnum } from "../../../enums/feature";
const FEATURE = FeatureCodeEnum.USERS;
const DELETE = FeatureCodeAction.DELETE;
interface DataType {
  key: React.Key;
  nomeCompleto: string;
  surpervisor: string;
  emailUsuario: string;
  especialidades: string;
  empresaAcessadaPeloUsuario: string;
  supervisor: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Nome Completo",
    dataIndex: "nomeCompleto",
    sorter: (a, b) => a.nomeCompleto.length - b.nomeCompleto.length,
    sortDirections: ["descend"],
  },
  {
    title: "Email do Usuário",
    dataIndex: "emailUsuario",
    sorter: (a, b) => a.emailUsuario.length - b.emailUsuario.length,
    sortDirections: ["descend"],
  },
  {
    title: "Especialidades",
    dataIndex: "especialidades",
    sorter: (a, b) => a.especialidades.length - b.especialidades.length,
    sortDirections: ["descend"],
  },
  {
    title: "Emp. Acessada Pelo Usuário",
    dataIndex: "especialidades",
    sorter: (a, b) => a.especialidades.length - b.especialidades.length,
    sortDirections: ["descend"],
  },
  {
    title: "Supervisor",
    dataIndex: "supervisor",
    sorter: (a, b) => a.supervisor.length - b.supervisor.length,
    sortDirections: ["descend"],
  },
  {
    title: "Ações",
    key: "acao",
    render: (_, record) => (
      <Space size="middle">
        {/* <Can I={DELETE} this={FEATURE}/> */}

        <Tooltip title="Excluir">
          <Button
            className="senai-btn-danger"
            shape="circle"
            onClick={() => {}}
          >
            <DeleteOutlined className="senai-icon" />
          </Button>
        </Tooltip>

        <Tooltip title="Detalhes">
          <Button className="senai-btn-info" shape="circle" onClick={() => {}}>
            <InfoOutlined   className="senai-icon" />
          </Button>
        </Tooltip>
      </Space>
    ),
  },
];

export default columns;
