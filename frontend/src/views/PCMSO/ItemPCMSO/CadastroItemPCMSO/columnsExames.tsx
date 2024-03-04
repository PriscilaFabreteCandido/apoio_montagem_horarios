import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Tooltip } from "antd";

const columnsExames = [
  {
    title: "Exame",
    dataIndex: "nomeExame",
    key: "nomeExame",
  },
  {
    title: "Código E-social",
    dataIndex: "codigoESocial",
    key: "codigoESocial",
  },
  {
    title: "Período",
    dataIndex: "periodo",
    key: "periodo",
  },
  {
    title: "Tipo Exame",
    dataIndex: "tipoExame",
    key: "tipoExame",
  },
  {
    title: "Ações",
    dataIndex: "acoes",
    key: "acoes",
    render: () => (
      <Space size="middle">
        <Popconfirm
          title="Tem certeza que deseja excluir?"
          onConfirm={() => {}}
          okText="Sim"
          cancelText="Não"
        >
          <Tooltip title="Excluir">
            <Button className="senai-btn-danger" shape="circle">
              <DeleteOutlined className="senai-icon" />
            </Button>
          </Tooltip>
        </Popconfirm>
      </Space>
    ),
  },
];

export default columnsExames;
