import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  id: number;
  codigoESocial: string;
  exame: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Código E-social",
    dataIndex: "codigoESocial",
    sorter: (a, b) => a.codigoESocial.length - b.codigoESocial.length,
    sortDirections: ["descend"],
  },
  {
    title: "Exame",
    dataIndex: "exame",
    sorter: (a, b) => a.exame.length - b.exame.length,
    sortDirections: ["descend"],
  },
  {
    title: "Ações",
    key: "acao",
    render: (acao, record: any) => (
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

        <Tooltip title="Detalhes">
          <Button className="senai-btn-info" shape="circle" onClick={() => {}}>
            <InfoOutlined className="senai-icon" />
          </Button>
        </Tooltip>

        <Tooltip title={record.ativo ? "Desativar Exame" : "Ativar Exame"}>
          <Button className={record.ativo ? "senai-btn-success" : "senai-btn-danger"} shape="circle" onClick={() => {}}>
            {record.ativo ? (
              <CloseCircleOutlined className="senai-icon" />
            ) : (
              <CheckCircleOutlined className="senai-icon" />
            )}
          </Button>
        </Tooltip>
      </Space>
    ),
  },
];

export default columns;
